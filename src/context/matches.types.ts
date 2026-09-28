import type { ProfileBlock } from "./profiles.types";

export type ChatMessage = {
  sender: "user" | "them";
} & (
  | { type?: "text"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "audio"; src: string; prompt?: string }
);

export type Match = {
  profileId: string;
  likedBlock: ProfileBlock;
  comment: string;
  messages: ChatMessage[];
  isTyping: boolean;
};
