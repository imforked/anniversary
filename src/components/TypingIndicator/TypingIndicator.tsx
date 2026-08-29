import { ProfileAvatar } from "../ProfileAvatar";
import * as S from "./TypingIndicator.styles";
import type { TypingIndicatorProps } from "./TypingIndicator.types";

export const TypingIndicator = ({ photo, isActive }: TypingIndicatorProps) => {
  if (!isActive) {
    return null;
  }

  return (
    <S.Row aria-label="Typing">
      <ProfileAvatar photo={photo} />
      <S.Bubble aria-hidden="true">
        <S.Dot />
        <S.Dot />
        <S.Dot />
      </S.Bubble>
    </S.Row>
  );
};
