import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "./assets/background.mp4";
import { Button } from "../Button";
import { CreateAccountForm } from "../CreateAccountForm";
import { SignInForm } from "../SignInForm";
import * as S from "./Login.styles";

const handleVideoLoaded = (
  event: React.SyntheticEvent<HTMLVideoElement>,
) => {
  event.currentTarget.playbackRate = 0.65;
};

export const Login = () => {
  const navigate = useNavigate();
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleSuccess = () => {
    setIsLeaving(true);
  };

  const handleFadeOutEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (!isLeaving) {
      return;
    }

    navigate("/discover");
  };

  return (
    <S.Container>
      <S.BackgroundVideo
        src={backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoaded}
      />
      <S.Scrim />
      <S.Top>
        <S.Wordmark>Hinge</S.Wordmark>
        <S.Headline>Designed to be deleted.</S.Headline>
      </S.Top>
      <S.Actions>
        <Button
          variant="primary"
          onClick={() => setIsCreateAccountOpen(true)}
        >
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
        $isVisible={isLeaving}
        onTransitionEnd={handleFadeOutEnd}
      />
    </S.Container>
  );
};
