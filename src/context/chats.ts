import type { ProfileChat } from "./chats.types";

export const chats = {
  "kari-walks": {
    messages: [
      {
        text: "hey, this is the first message",
      },
      {
        text: "hey, this is the second message",
        typingDurationSeconds: 2,
      },
    ],
  },
  goat: {
    messages: [
      {
        text: "hey, this is the first goat message",
      },
      {
        text: "hey, this is the second goat message",
        typingDurationSeconds: 2,
      },
    ],
  },
} satisfies Record<string, ProfileChat>;
