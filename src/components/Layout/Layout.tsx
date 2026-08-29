import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ItsAMatch } from "../ItsAMatch";
import { USER_PHOTO } from "../../constants/user";
import { useMatchOverlay } from "../../context/matchOverlay";
import * as S from "./Layout.styles";
import { type LayoutProps } from "./Layout.types";

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { matchOverlay, clearMatch } = useMatchOverlay();
  const hasNavigated = useRef(false);

  const handleNavigate = useCallback(() => {
    if (!matchOverlay || hasNavigated.current) {
      return;
    }

    hasNavigated.current = true;
    navigate(`/messages/${matchOverlay.profileId}`);
  }, [matchOverlay, navigate]);

  const handleComplete = useCallback(() => {
    hasNavigated.current = false;
    clearMatch();
  }, [clearMatch]);

  return (
    <S.Wrapper>
      <S.Container>{children}</S.Container>
      {matchOverlay ? (
        <ItsAMatch
          userPhoto={USER_PHOTO}
          matchPhoto={matchOverlay.matchPhoto}
          onNavigate={handleNavigate}
          onComplete={handleComplete}
        />
      ) : null}
    </S.Wrapper>
  );
};
