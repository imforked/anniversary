import type { ProfileImage } from "../../context/profiles.types";
import * as S from "./ProfileAvatar.styles";

type ProfileAvatarProps = {
  photo: ProfileImage;
  size?: number;
};

export const ProfileAvatar = ({ photo, size = 32 }: ProfileAvatarProps) => {
  return <S.Image src={photo.src} alt={photo.alt} $size={size} />;
};
