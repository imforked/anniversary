const cachedUrls = new Map<string, string>();
const listeners = new Map<string, Set<(url: string) => void>>();

export const getCachedAssetUrl = (src: string) => {
  return cachedUrls.get(src) ?? src;
};

export const subscribeCachedAsset = (
  src: string,
  listener: (url: string) => void,
) => {
  const cachedUrl = cachedUrls.get(src);

  if (cachedUrl) {
    listener(cachedUrl);
  }

  let srcListeners = listeners.get(src);

  if (!srcListeners) {
    srcListeners = new Set();
    listeners.set(src, srcListeners);
  }

  srcListeners.add(listener);

  return () => {
    srcListeners?.delete(listener);
  };
};

export const storeCachedAsset = (src: string, objectUrl: string) => {
  cachedUrls.set(src, objectUrl);
  listeners.get(src)?.forEach((listener) => {
    listener(objectUrl);
  });
};

export const hasCachedAsset = (src: string) => {
  return cachedUrls.has(src);
};
