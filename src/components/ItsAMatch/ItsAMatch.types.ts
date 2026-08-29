import type { ProfileImage } from "../../context/profiles.types";

export type ItsAMatchProps = {
  userPhoto: ProfileImage;
  matchPhoto: ProfileImage;
  onComplete: () => void;
};
