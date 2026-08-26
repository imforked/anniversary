import type { ProfileBlock } from "../../context/profiles.types";

export type ProfileCardProps = {
  block: ProfileBlock;
  onLike?: () => void;
  showLikeButton?: boolean;
  /** When true, text blocks use a 1:1 frame with clipped overflow (SendLike). */
  constrainTextToSquare?: boolean;
};
