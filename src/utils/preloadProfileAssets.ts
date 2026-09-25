import { USER_PHOTO } from "../constants/user";
import { profiles } from "../context/profiles";
import { hasCachedAsset, storeCachedAsset } from "./assetCache";

const MIN_LOADER_MS = 1200;
const ASSET_TIMEOUT_MS = 45000;
const MEDIA_CONCURRENCY = 3;
const IMAGE_CONCURRENCY = 8;
const IMAGE_EXTENSION = /\.(avif|gif|jpe?g|png|svg|webp)$/i;
const VIDEO_EXTENSION = /\.(m4v|mov|mp4|webm)$/i;

let preloadPromise: Promise<void> | null = null;

const collectAssetSrcs = () => {
  const srcs = new Set<string>([USER_PHOTO.src]);

  for (const profile of profiles) {
    srcs.add(profile.photo.src);

    for (const block of profile.blocks) {
      if (
        block.type === "image" ||
        block.type === "audio" ||
        block.type === "video"
      ) {
        srcs.add(block.src);
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

const preloadAsset = (src: string) => {
  return withTimeout(
    cacheAsset(src).catch(() => undefined),
    ASSET_TIMEOUT_MS,
  );
};

const runPool = async (srcs: string[], concurrency: number) => {
  const queue = [...srcs];
  const workerCount = Math.min(concurrency, queue.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (queue.length > 0) {
        const src = queue.shift();

        if (src) {
          await preloadAsset(src);
        }
      }
    }),
  );
};

const wait = (ms: number) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const preloadAllAssets = async () => {
  const srcs = collectAssetSrcs();
  const videos = srcs.filter((src) => VIDEO_EXTENSION.test(src));
  const images = srcs.filter((src) => IMAGE_EXTENSION.test(src));
  const audio = srcs.filter(
    (src) => !VIDEO_EXTENSION.test(src) && !IMAGE_EXTENSION.test(src),
  );

  await runPool(videos, MEDIA_CONCURRENCY);
  await runPool([...images, ...audio], IMAGE_CONCURRENCY);
};

export const preloadProfileAssets = () => {
  if (!preloadPromise) {
    preloadPromise = preloadAllAssets();
  }

  return preloadPromise;
};

export const waitForProfileAssets = async (minDurationMs = MIN_LOADER_MS) => {
  await Promise.all([preloadProfileAssets(), wait(minDurationMs)]);
};
