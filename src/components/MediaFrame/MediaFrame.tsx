import * as S from "./MediaFrame.styles";
import type { MediaFrameProps } from "./MediaFrame.types";

export const MediaFrame = ({
  children,
  prompt,
  compact = false,
}: MediaFrameProps) => {
  const trimmedPrompt = prompt?.trim();

  return (
    <S.Root $compact={compact}>
      {children}
      {trimmedPrompt ? (
        <>
          <S.Overlay />
          <S.Prompt $compact={compact}>{trimmedPrompt}</S.Prompt>
        </>
      ) : null}
    </S.Root>
  );
};
