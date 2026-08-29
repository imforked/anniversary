import type { ProfileImage } from "../../context/profiles.types";
import * as S from "./ProfileAvatar.styles";

type ProfileAvatarProps = {
  photo: ProfileImage;
};

export const ProfileAvatar = ({ photo }: ProfileAvatarProps) => {
  return <S.Image src={photo.src} alt={photo.alt} />;
};
