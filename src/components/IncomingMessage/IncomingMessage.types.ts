import type { ChatMessage } from "../../context/matches.types";
import type { ProfileImage } from "../../context/profiles.types";

export type IncomingMessageProps = {
  photo: ProfileImage;
  message: ChatMessage;
};
