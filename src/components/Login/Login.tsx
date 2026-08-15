import backgroundVideo from "./assets/background.mp4";
import { Button } from "../Button";
import * as S from "./Login.styles";

const handleVideoLoaded = (
  event: React.SyntheticEvent<HTMLVideoElement>,
) => {
  event.currentTarget.playbackRate = 0.65;
};

export const Login = () => {
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
        <Button variant="primary">Create account</Button>
        <Button variant="transparent">Sign in</Button>
      </S.Actions>
    </S.Container>
  );
};
