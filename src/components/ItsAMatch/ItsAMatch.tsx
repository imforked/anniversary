import { useEffect, useRef, useState } from "react";
import { useCachedSrc } from "../../utils/useCachedSrc";
import * as S from "./ItsAMatch.styles";
import type { ItsAMatchProps } from "./ItsAMatch.types";

const fadeInEase = [0.32, 0.72, 0, 1] as const;
export const MATCH_BACKDROP_FADE_IN_SECONDS = 0.55;
export const MATCH_CONTENT_FADE_IN_DELAY_SECONDS = 0.18;
export const MATCH_CONTENT_FADE_IN_DURATION_SECONDS = 0.5;
export const MATCH_HOLD_DURATION_SECONDS = 2.17;
export const MATCH_FADE_OUT_DURATION_SECONDS = 1.5;

export const MATCH_OVERLAY_DURATION_SECONDS =
  MATCH_CONTENT_FADE_IN_DELAY_SECONDS +
  MATCH_CONTENT_FADE_IN_DURATION_SECONDS +
  MATCH_HOLD_DURATION_SECONDS +
  MATCH_FADE_OUT_DURATION_SECONDS;

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
  const userSrc = useCachedSrc(userPhoto.src);
  const matchSrc = useCachedSrc(matchPhoto.src);

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
    }, (MATCH_HOLD_DURATION_SECONDS / 2) * 1000);

    const fadeOutTimeoutId = window.setTimeout(() => {
      setPhase("fadeOut");
    }, MATCH_HOLD_DURATION_SECONDS * 1000);

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
          duration: isFadingOut ? MATCH_FADE_OUT_DURATION_SECONDS : MATCH_BACKDROP_FADE_IN_SECONDS,
          ease: isFadingOut ? fadeOutEase : fadeInEase,
        }}
        onAnimationComplete={handleBackdropAnimationComplete}
      />
      <S.Content
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{
          duration: isFadingOut ? MATCH_FADE_OUT_DURATION_SECONDS : MATCH_CONTENT_FADE_IN_DURATION_SECONDS,
          delay: isFadingIn ? MATCH_CONTENT_FADE_IN_DELAY_SECONDS : 0,
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
            duration: isFadingOut ? MATCH_FADE_OUT_DURATION_SECONDS : MATCH_CONTENT_FADE_IN_DURATION_SECONDS,
            delay: isFadingIn ? MATCH_CONTENT_FADE_IN_DELAY_SECONDS : 0,
            ease: isFadingOut ? fadeOutEase : fadeInEase,
          }}
        >
          <S.Photo src={userSrc} alt={userPhoto.alt} $offset={0} />
          <S.Photo src={matchSrc} alt={matchPhoto.alt} $offset={-28} />
        </S.Photos>
        <S.Title
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: isFadingOut ? 0 : 1,
            y: isFadingOut ? -8 : 0,
          }}
          transition={{
            duration: isFadingOut ? MATCH_FADE_OUT_DURATION_SECONDS : MATCH_CONTENT_FADE_IN_DURATION_SECONDS,
            delay: isFadingIn ? MATCH_CONTENT_FADE_IN_DELAY_SECONDS + 0.06 : 0,
            ease: isFadingOut ? fadeOutEase : fadeInEase,
          }}
        >
          It&apos;s a Match
        </S.Title>
      </S.Content>
    </>
  );
};
