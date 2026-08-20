import * as S from "./ProfileName.styles";
import type { ProfileNameProps } from "./ProfileName.types";

export const ProfileName = ({ name }: ProfileNameProps) => {
  return (
    <S.Header>
      <S.Name>{name}</S.Name>
    </S.Header>
  );
};
