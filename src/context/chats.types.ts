export const DEFAULT_TYPING_DURATION_SECONDS = 3;
export const DEFAULT_TYPING_START_DELAY_SECONDS = 0.5;

type ChatMessageTiming = {
  /** Seconds to wait before the typing indicator starts for this message. */
  typingStartDelaySeconds?: number;
  /** Seconds the typing indicator shows before this message is posted. */
  typingDurationSeconds?: number;
};

export type IncomingTextMessage = ChatMessageTiming & {
  type?: "text";
  text: string;
};

export type IncomingImageMessage = ChatMessageTiming & {
  type: "image";
  src: string;
  alt?: string;
};

export type IncomingAudioMessage = ChatMessageTiming & {
  type: "audio";
  src: string;
  prompt?: string;
};

export type IncomingChatMessage =
  | IncomingTextMessage
  | IncomingImageMessage
  | IncomingAudioMessage;

export type ProfileChat = {
  messages: IncomingChatMessage[];
};

export const getTypingStartDelaySeconds = (message: IncomingChatMessage) => {
  return message.typingStartDelaySeconds ?? DEFAULT_TYPING_START_DELAY_SECONDS;
};

export const getTypingDurationSeconds = (message: IncomingChatMessage) => {
  return message.typingDurationSeconds ?? DEFAULT_TYPING_DURATION_SECONDS;
};

export const getChatMessagePreview = (message: IncomingChatMessage | { type?: string; text?: string }) => {
  if (message.type === "image") {
    return "Sent a photo";
  }

  if (message.type === "audio") {
    return "Sent a voice note";
  }

  return message.text ?? "";
};
