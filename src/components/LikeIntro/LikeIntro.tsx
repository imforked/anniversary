import { AudioPrompt } from "../AudioPrompt";
import * as S from "./LikeIntro.styles";
import type { LikeIntroProps } from "./LikeIntro.types";

export const LikeIntro = ({ block, comment }: LikeIntroProps) => {
  const trimmedComment = comment.trim();

  return (
    <S.Root>
      <S.PromptCard>
        <S.PromptSurface>
          {block.type === "image" ? (
            <S.Photo src={block.src} alt={block.alt} />
          ) : block.type === "audio" ? (
            <AudioPrompt prompt={block.prompt} src={block.src} compact />
          ) : (
            <S.TextContent>
              <S.Prompt>{block.prompt}</S.Prompt>
              <S.Answer>{block.answer}</S.Answer>
            </S.TextContent>
          )}
        </S.PromptSurface>
        {trimmedComment ? (
          <S.CommentBubble>{trimmedComment}</S.CommentBubble>
        ) : null}
      </S.PromptCard>
    </S.Root>
  );
};
