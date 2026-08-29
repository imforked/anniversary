import type { ProfileBlock } from "./profiles.types";

export type ChatMessage = {
  sender: "user" | "them";
  text: string;
};

export type Match = {
  profileId: string;
  likedBlock: ProfileBlock;
  comment: string;
  messages: ChatMessage[];
  isTyping: boolean;
};
