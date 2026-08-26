import type { ProfileBlock } from "../../context/profiles.types";

export type SendLikeProps = {
  block: ProfileBlock;
  blockLayoutId: string;
  onCancel: () => void;
};
