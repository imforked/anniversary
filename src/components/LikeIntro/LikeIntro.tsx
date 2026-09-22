import { AudioPrompt } from "../AudioPrompt";
import { MediaFrame } from "../MediaFrame";
import { VideoPrompt } from "../VideoPrompt";
import * as S from "./LikeIntro.styles";
import type { LikeIntroProps } from "./LikeIntro.types";

export const LikeIntro = ({ block, comment }: LikeIntroProps) => {
  const trimmedComment = comment.trim();

  return (
    <S.Root>
      <S.PromptCard>
        <S.PromptSurface>
          {block.type === "image" ? (
            <MediaFrame prompt={block.prompt} compact>
              <S.Photo src={block.src} alt={block.alt} />
            </MediaFrame>
          ) : block.type === "audio" ? (
            <AudioPrompt prompt={block.prompt} src={block.src} compact />
          ) : block.type === "video" ? (
            <VideoPrompt prompt={block.prompt} src={block.src} compact />
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
