import type { ProfileImage } from "../../context/profiles.types";
import { useCachedSrc } from "../../utils/useCachedSrc";
import * as S from "./ProfileAvatar.styles";

type ProfileAvatarProps = {
  photo: ProfileImage;
  size?: number;
};

export const ProfileAvatar = ({ photo, size = 32 }: ProfileAvatarProps) => {
  const src = useCachedSrc(photo.src);

  return <S.Image src={src} alt={photo.alt} $size={size} />;
};
