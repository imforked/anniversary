import { MediaFrame } from "../MediaFrame";
import { useCachedSrc } from "../../utils/useCachedSrc";
import * as S from "./VideoPrompt.styles";
import type { VideoPromptProps } from "./VideoPrompt.types";

export const VideoPrompt = ({
  prompt,
  src,
  compact = false,
}: VideoPromptProps) => {
  const playbackSrc = useCachedSrc(src);

  return (
    <MediaFrame prompt={prompt} compact={compact}>
      <S.Video
        src={playbackSrc}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
      />
    </MediaFrame>
  );
};
