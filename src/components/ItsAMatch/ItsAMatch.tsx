import { useEffect, useState } from "react";
import * as S from "./ItsAMatch.styles";
import type { ItsAMatchProps } from "./ItsAMatch.types";

const fadeInEase = [0.32, 0.72, 0, 1] as const;
const fadeInDuration = 0.5;
const holdDuration = 2.35;
const fadeOutDuration = 0.15;

type Phase = "fadeIn" | "hold" | "fadeOut";

export const ItsAMatch = ({
  userPhoto,
  matchPhoto,
  onComplete,
}: ItsAMatchProps) => {
  const [phase, setPhase] = useState<Phase>("fadeIn");

  useEffect(() => {
    if (phase !== "hold") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("fadeOut");
    }, holdDuration * 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [phase]);

  const isFadingOut = phase === "fadeOut";
  const contentDuration = phase === "fadeIn" ? fadeInDuration : fadeOutDuration;
  const contentEase = isFadingOut ? "linear" : fadeInEase;

  const handleContentAnimationComplete = () => {
    if (phase === "fadeIn") {
      setPhase("hold");
    }
  };

  const handleBackdropAnimationComplete = () => {
    if (phase === "fadeOut") {
      onComplete();
    }
  };

  return (
    <>
      <S.Backdrop
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{
          duration: isFadingOut ? fadeOutDuration : 0,
          ease: "linear",
        }}
        onAnimationComplete={handleBackdropAnimationComplete}
      />
      <S.Content
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{
          duration: contentDuration,
          ease: contentEase,
        }}
        onAnimationComplete={handleContentAnimationComplete}
      >
        <S.Photos>
          <S.Photo src={userPhoto.src} alt={userPhoto.alt} $offset={0} />
          <S.Photo src={matchPhoto.src} alt={matchPhoto.alt} $offset={-28} />
        </S.Photos>
        <S.Title
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: isFadingOut ? 0 : 1,
            y: isFadingOut ? -8 : 0,
          }}
          transition={{
            duration: contentDuration,
            ease: contentEase,
          }}
        >
          It&apos;s a Match
        </S.Title>
      </S.Content>
    </>
  );
};
