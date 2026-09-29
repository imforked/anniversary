import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "./assets/background.mp4";
import { Button } from "../Button";
import { CreateAccountForm } from "../CreateAccountForm";
import { SignInForm } from "../SignInForm";
import { preloadProfileAssets } from "../../utils/preloadProfileAssets";
import * as S from "./Login.styles";

export const Login = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasRevealed = useRef(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const revealLogin = (video: HTMLVideoElement) => {
    if (hasRevealed.current) {
      return;
    }

    hasRevealed.current = true;
    video.playbackRate = 0.65;
    setIsVideoReady(true);
    void preloadProfileAssets();
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      revealLogin(video);
    }
  }, []);

  const handleVideoCanPlay = (
    event: React.SyntheticEvent<HTMLVideoElement>,
  ) => {
    revealLogin(event.currentTarget);
  };

  const handleSuccess = () => {
    setIsLeaving(true);
  };

  const handleFadeOutEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (!isLeaving) {
      return;
    }

    navigate("/discover", { state: { fromLogin: true } });
  };

  return (
    <S.Container>
      <S.BackgroundVideo
        ref={videoRef}
        src={backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleVideoCanPlay}
        onError={() => {
          hasRevealed.current = true;
          setIsVideoReady(true);
        }}
      />
      <S.Scrim />
      <S.Top>
        <S.Wordmark>Hinge</S.Wordmark>
        <S.Headline>Designed to be deleted.</S.Headline>
      </S.Top>
      <S.Actions>
        <Button variant="primary" onClick={() => setIsCreateAccountOpen(true)}>
          Create account
        </Button>
        <Button variant="transparent" onClick={() => setIsSignInOpen(true)}>
          Sign in
        </Button>
      </S.Actions>

      <CreateAccountForm
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        onSuccess={handleSuccess}
      />
      <SignInForm
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSuccess={handleSuccess}
      />

      <S.FadeCover
        $isVisible={!isVideoReady || isLeaving}
        onTransitionEnd={handleFadeOutEnd}
      />
    </S.Container>
  );
};
