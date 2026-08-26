import * as S from "./ProfileCard.styles";
import type { ProfileCardProps } from "./ProfileCard.types";

const HeartIcon = () => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-6.2-4.35-9.33-8.22C.8 10.5.9 7.4 3.1 5.7c2-1.54 4.9-1.1 6.5.7L12 8.9l2.4-2.5c1.6-1.8 4.5-2.24 6.5-.7 2.2 1.7 2.3 4.8.43 7.08C18.2 16.65 12 21 12 21z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ProfileCard = ({
  block,
  onLike,
  showLikeButton = true,
}: ProfileCardProps) => {
  return (
    <S.Card $variant={block.type}>
      {block.type === "image" ? (
        <S.Photo src={block.src} alt={block.alt} />
      ) : (
        <S.TextContent>
          <S.Prompt>{block.prompt}</S.Prompt>
          <S.Answer>{block.answer}</S.Answer>
        </S.TextContent>
      )}

      {showLikeButton ? (
        <S.LikeButton type="button" aria-label="Like" onClick={onLike}>
          <HeartIcon />
        </S.LikeButton>
      ) : null}
    </S.Card>
  );
};
