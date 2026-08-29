import { useEffect, useRef, useState } from "react";
import * as S from "./ItsAMatch.styles";
import type { ItsAMatchProps } from "./ItsAMatch.types";

const fadeInEase = [0.32, 0.72, 0, 1] as const;
const backdropFadeInDuration = 0.55;
const contentFadeInDelay = 0.18;
const contentFadeInDuration = 0.5;
const holdDuration = 2.17;
const fadeOutDuration = 1.5;
const fadeOutEase = fadeInEase;

type Phase = "fadeIn" | "hold" | "fadeOut";

export const ItsAMatch = ({
  userPhoto,
  matchPhoto,
  onNavigate,
  onComplete,
}: ItsAMatchProps) => {
  const [phase, setPhase] = useState<Phase>("fadeIn");
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (phase !== "hold") {
      return;
    }

    const navigateTimeoutId = window.setTimeout(() => {
      if (hasNavigated.current) {
        return;
      }

      hasNavigated.current = true;
      onNavigate?.();
    }, (holdDuration / 2) * 1000);

    const fadeOutTimeoutId = window.setTimeout(() => {
      setPhase("fadeOut");
    }, holdDuration * 1000);

    return () => {
      window.clearTimeout(navigateTimeoutId);
      window.clearTimeout(fadeOutTimeoutId);
    };
  }, [onNavigate, phase]);

  const isFadingOut = phase === "fadeOut";
  const isFadingIn = phase === "fadeIn";

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
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{
          duration: isFadingOut ? fadeOutDuration : backdropFadeInDuration,
          ease: isFadingOut ? fadeOutEase : fadeInEase,
        }}
        onAnimationComplete={handleBackdropAnimationComplete}
      />
      <S.Content
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{
          duration: isFadingOut ? fadeOutDuration : contentFadeInDuration,
          delay: isFadingIn ? contentFadeInDelay : 0,
          ease: isFadingOut ? fadeOutEase : fadeInEase,
        }}
        onAnimationComplete={handleContentAnimationComplete}
      >
        <S.Photos
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: isFadingOut ? 0 : 1,
            scale: isFadingOut ? 0.98 : 1,
          }}
          transition={{
            duration: isFadingOut ? fadeOutDuration : contentFadeInDuration,
            delay: isFadingIn ? contentFadeInDelay : 0,
            ease: isFadingOut ? fadeOutEase : fadeInEase,
          }}
        >
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
            duration: isFadingOut ? fadeOutDuration : contentFadeInDuration,
            delay: isFadingIn ? contentFadeInDelay + 0.06 : 0,
            ease: isFadingOut ? fadeOutEase : fadeInEase,
          }}
        >
          It&apos;s a Match
        </S.Title>
      </S.Content>
    </>
  );
};
