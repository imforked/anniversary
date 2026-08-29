import { ProfileAvatar } from "../ProfileAvatar";
import * as S from "./MatchListItem.styles";

type MatchListItemProps = {
  profileId: string;
  name: string;
  photo: { src: string; alt: string };
  lastMessage: string;
};

export const MatchListItem = ({
  profileId,
  name,
  photo,
  lastMessage,
}: MatchListItemProps) => {
  return (
    <S.Item to={`/messages/${profileId}`}>
      <ProfileAvatar photo={photo} size={52} />
      <S.Content>
        <S.Name>{name}</S.Name>
        <S.Preview>{lastMessage}</S.Preview>
      </S.Content>
    </S.Item>
  );
};
