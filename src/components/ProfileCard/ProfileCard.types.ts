import type { ProfileBlock } from "../../context/profiles.types";

export type ProfileCardProps = {
  block: ProfileBlock;
  onLike?: () => void;
  showLikeButton?: boolean;
};
