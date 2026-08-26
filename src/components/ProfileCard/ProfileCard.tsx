import { useEffect, useRef, useState } from "react";
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
  constrainTextToSquare = false,
}: ProfileCardProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const constrainText = block.type === "text" && constrainTextToSquare;
  const isSquare = block.type === "image" || constrainText;

  useEffect(() => {
    if (!constrainText) {
      setIsTextOverflowing(false);
      return;
    }

    const element = textRef.current;

    if (!element) {
      return;
    }

    const updateOverflow = () => {
      setIsTextOverflowing(element.scrollHeight > element.clientHeight + 1);
    };

    updateOverflow();

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [block, constrainText]);

  return (
    <S.Card $square={isSquare}>
      {block.type === "image" ? (
        <S.Photo src={block.src} alt={block.alt} />
      ) : (
        <>
          <S.TextContent ref={textRef} $constrained={constrainText}>
            <S.Prompt>{block.prompt}</S.Prompt>
            <S.Answer>{block.answer}</S.Answer>
          </S.TextContent>
          {constrainText && isTextOverflowing ? <S.TextFade /> : null}
        </>
      )}

      {showLikeButton ? (
        <S.LikeButton type="button" aria-label="Like" onClick={onLike}>
          <HeartIcon />
        </S.LikeButton>
      ) : null}
    </S.Card>
  );
};
