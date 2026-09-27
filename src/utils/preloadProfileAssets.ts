import { USER_PHOTO } from "../constants/user";
import { getProfileById, profiles } from "../context/profiles";
import type { Profile } from "../context/profiles.types";
import {
  hasCachedAsset,
  markAssetSettled,
  storeCachedAsset,
  whenAssetSettled,
} from "./assetCache";

const MIN_LOADER_MS = 1200;
const ASSET_TIMEOUT_MS = 45000;
const PRELOAD_CONCURRENCY = 4;
const IMAGE_EXTENSION = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

const queued = new Set<string>();
const inFlight = new Set<string>();
const queue: string[] = [];
let activeCount = 0;
let pipelineStarted = false;

const collectProfileAssetSrcs = (profile: Profile) => {
  const srcs = new Set<string>([profile.photo.src]);

  for (const block of profile.blocks) {
    if (
      block.type === "image" ||
      block.type === "audio" ||
      block.type === "video"
    ) {
      srcs.add(block.src);
    }
  }

  return [...srcs];
};

const collectFirstProfileImageSrcs = () => {
  const firstProfile = profiles[0];
  const srcs = new Set<string>([USER_PHOTO.src]);

  if (firstProfile) {
    for (const src of collectProfileAssetSrcs(firstProfile)) {
      if (IMAGE_EXTENSION.test(src)) {
        srcs.add(src);
      }
    }
  }

  return [...srcs];
};

const withTimeout = (task: Promise<void>, timeoutMs: number) => {
  return new Promise<void>((resolve) => {
    const timeoutId = window.setTimeout(resolve, timeoutMs);

    task.finally(() => {
      window.clearTimeout(timeoutId);
      resolve();
    });
  });
};

const decodeImage = (src: string) => {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
};

const cacheAsset = async (src: string) => {
  if (hasCachedAsset(src)) {
    markAssetSettled(src);
    return;
  }

  const response = await fetch(src);

  if (!response.ok) {
    return;
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  storeCachedAsset(src, objectUrl);

  if (IMAGE_EXTENSION.test(src)) {
    await decodeImage(objectUrl);
  }
};

const preloadAsset = async (src: string) => {
  try {
    await withTimeout(
      cacheAsset(src).catch(() => undefined),
      ASSET_TIMEOUT_MS,
    );
  } finally {
    markAssetSettled(src);
  }
};

const pumpQueue = () => {
  while (activeCount < PRELOAD_CONCURRENCY && queue.length > 0) {
    const src = queue.shift();

    if (!src) {
      break;
    }

    queued.delete(src);
    inFlight.add(src);
    activeCount += 1;

    void preloadAsset(src).finally(() => {
      inFlight.delete(src);
      activeCount -= 1;
      pumpQueue();
    });
  }
};

const enqueueSrcs = (srcs: string[], front = false) => {
  const nextSrcs: string[] = [];

  for (const src of srcs) {
    if (hasCachedAsset(src) || inFlight.has(src)) {
      continue;
    }

    if (queued.has(src)) {
      const queuedIndex = queue.indexOf(src);

      if (queuedIndex >= 0) {
        queue.splice(queuedIndex, 1);
      }
    } else {
      queued.add(src);
    }

    nextSrcs.push(src);
  }

  if (front) {
    queue.unshift(...nextSrcs);
  } else {
    queue.push(...nextSrcs);
  }

  pumpQueue();
};

const wait = (ms: number) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const waitForSrcs = (srcs: string[]) => {
  return Promise.all(srcs.map((src) => whenAssetSettled(src)));
};

const startPreloadPipeline = () => {
  if (pipelineStarted) {
    return;
  }

  pipelineStarted = true;

  const firstImageSrcs = collectFirstProfileImageSrcs();
  enqueueSrcs(firstImageSrcs, true);

  const remainingSrcs = profiles.flatMap((profile, index) => {
    const srcs = collectProfileAssetSrcs(profile);

    if (index === 0) {
      return srcs.filter((src) => !IMAGE_EXTENSION.test(src));
    }

    return srcs;
  });

  enqueueSrcs(remainingSrcs);
};

export const preloadProfileAssets = () => {
  startPreloadPipeline();
  return waitForSrcs(collectFirstProfileImageSrcs());
};

export const prioritizeProfileAssets = (profileId: string) => {
  startPreloadPipeline();
  const profile = getProfileById(profileId);

  if (!profile) {
    return;
  }

  enqueueSrcs(collectProfileAssetSrcs(profile), true);
};

export const waitForProfileAssets = async (minDurationMs = MIN_LOADER_MS) => {
  startPreloadPipeline();
  await Promise.all([
    waitForSrcs(collectFirstProfileImageSrcs()),
    wait(minDurationMs),
  ]);
};
