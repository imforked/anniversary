import type { ProfileChat } from "./chats.types";

export const chats = {
  "kari-walks": {
    messages: [
      {
        text: "Hey sweet girl",
        typingStartDelaySeconds: 1,
        typingDurationSeconds: 1.6,
      },
      {
        text: "One of the best gifts you’ve given me is Kari Walks",
        typingStartDelaySeconds: 0.8,
        typingDurationSeconds: 4,
      },
      {
        text: "It gives me mystery",
        typingStartDelaySeconds: 0.5,
        typingDurationSeconds: 2.5,
      },
      {
        text: "beauty",
        typingStartDelaySeconds: 0.25,
        typingDurationSeconds: 2,
      },
      {
        text: "and gives my body something INTERESTING to do",
        typingStartDelaySeconds: 0.4,
        typingDurationSeconds: 4,
      },
      {
        text: "And",
        typingStartDelaySeconds: 0.7,
        typingDurationSeconds: 1.5,
      },
      {
        text: "It’s way better when you’re with me because you teach me new things and I get to feel your sweet touch along the way",
        typingStartDelaySeconds: 0.35,
        typingDurationSeconds: 6.5,
      },
      {
        text: "Thank you so much. Let's continue to explore.",
        typingStartDelaySeconds: 1.1,
        typingDurationSeconds: 3,
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
