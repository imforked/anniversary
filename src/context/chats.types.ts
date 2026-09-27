export const DEFAULT_TYPING_DURATION_SECONDS = 3;

export type IncomingChatMessage = {
  text: string;
  /** Seconds the typing indicator shows before this message is posted. */
  typingDurationSeconds?: number;
};

export type ProfileChat = {
  messages: IncomingChatMessage[];
};

export const getTypingDurationSeconds = (message: IncomingChatMessage) => {
  return message.typingDurationSeconds ?? DEFAULT_TYPING_DURATION_SECONDS;
};
