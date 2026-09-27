import { useEffect, useRef } from "react";
import { MediaFrame } from "../MediaFrame";
import { useCachedSrc } from "../../utils/useCachedSrc";
import * as S from "./VideoPrompt.styles";
import type { VideoPromptProps } from "./VideoPrompt.types";

export const VideoPrompt = ({
  prompt,
  src,
  compact = false,
  isActive = true,
}: VideoPromptProps) => {
  const playbackSrc = useCachedSrc(src);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isActive) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isActive, playbackSrc]);

  return (
    <MediaFrame prompt={prompt} compact={compact}>
      <S.Video
        ref={videoRef}
        src={playbackSrc}
        loop
        muted
        playsInline
        autoPlay={isActive}
        preload="auto"
      />
    </MediaFrame>
  );
};
