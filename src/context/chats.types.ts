export const DEFAULT_TYPING_DURATION_SECONDS = 3;
export const DEFAULT_TYPING_START_DELAY_SECONDS = 0.5;

export type IncomingChatMessage = {
  text: string;
  /** Seconds to wait before the typing indicator starts for this message. */
  typingStartDelaySeconds?: number;
  /** Seconds the typing indicator shows before this message is posted. */
  typingDurationSeconds?: number;
};

export type ProfileChat = {
  messages: IncomingChatMessage[];
};

export const getTypingStartDelaySeconds = (message: IncomingChatMessage) => {
  return message.typingStartDelaySeconds ?? DEFAULT_TYPING_START_DELAY_SECONDS;
};

export const getTypingDurationSeconds = (message: IncomingChatMessage) => {
  return message.typingDurationSeconds ?? DEFAULT_TYPING_DURATION_SECONDS;
};
