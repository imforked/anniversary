import { ProfileAvatar } from "../ProfileAvatar";
import * as S from "./IncomingMessage.styles";
import type { IncomingMessageProps } from "./IncomingMessage.types";

export const IncomingMessage = ({ photo, text }: IncomingMessageProps) => {
  return (
    <S.Row>
      <ProfileAvatar photo={photo} />
      <S.Bubble>{text}</S.Bubble>
    </S.Row>
  );
};
