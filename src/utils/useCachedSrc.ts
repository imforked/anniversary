import { useEffect, useState } from "react";
import { getCachedAssetUrl, subscribeCachedAsset } from "./assetCache";

export const useCachedSrc = (src: string) => {
  const [cachedSrc, setCachedSrc] = useState(() => getCachedAssetUrl(src));

  useEffect(() => {
    setCachedSrc(getCachedAssetUrl(src));

    return subscribeCachedAsset(src, setCachedSrc);
  }, [src]);

  return cachedSrc;
};
