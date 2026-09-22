import { MediaFrame } from "../MediaFrame";
import * as S from "./VideoPrompt.styles";
import type { VideoPromptProps } from "./VideoPrompt.types";

export const VideoPrompt = ({
  prompt,
  src,
  compact = false,
}: VideoPromptProps) => {
  return (
    <MediaFrame prompt={prompt} compact={compact}>
      <S.Video
        src={src}
        loop
        muted
        playsInline
        autoPlay
        preload="metadata"
      />
    </MediaFrame>
  );
};
