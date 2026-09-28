import type { ProfileChat } from "./chats.types";

export const chats = {
  "kari-walks": {
    messages: [
      {
        text: "hey, this is the first message",
        typingStartDelaySeconds: 1,
      },
      {
        text: "hey, this is the second message",
        typingDurationSeconds: 2,
      },
      {
        type: "image",
        src: "/profiles/kari-walks/lil-guy.jpg",
        alt: "Kari's lil guy",
        typingDurationSeconds: 2,
      },
      {
        type: "audio",
        src: "/profiles/parrot/parrot-ily.m4a",
        typingDurationSeconds: 2,
      },
    ],
  },
  goat: {
    messages: [
      {
        text: "hey, this is the first goat message",
        typingStartDelaySeconds: 1,
      },
      {
        text: "hey, this is the second goat message",
        typingDurationSeconds: 2,
      },
    ],
  },
} satisfies Record<string, ProfileChat>;
