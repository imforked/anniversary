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
  "the-ladies": {
    messages: [
      {
        text: "I’m grateful that you and the ladies have invited me into your cozy home.",
        typingStartDelaySeconds: 1,
        typingDurationSeconds: 5,
      },
      {
        text: "Whether we're learning how to purr...",
        typingStartDelaySeconds: 0.5,
        typingDurationSeconds: 2.5,
      },
      {
        text: "Investigating mysterious boxes…",
        typingStartDelaySeconds: 0.25,
        typingDurationSeconds: 2.5,
      },
      {
        text: "Or hiding from the monstrous pb…",
        typingStartDelaySeconds: 0.25,
        typingDurationSeconds: 2.5,
      },
      {
        text: "I love being a part of this family",
        typingStartDelaySeconds: 0.7,
        typingDurationSeconds: 3,
      },
      {
        text: "Thank you bringing me into this family",
        typingStartDelaySeconds: 1.1,
        typingDurationSeconds: 3,
      },
    ],
  },
  "creative-energy": {
    messages: [
      {
        text: "My muuuuuuuse",
        typingStartDelaySeconds: 1,
        typingDurationSeconds: 1.6,
      },
      {
        text: "😘",
        typingStartDelaySeconds: 0.25,
        typingDurationSeconds: 1.5,
      },
      {
        text: "One of the most valuable dimensions of our relationship is our creative energy.",
        typingStartDelaySeconds: 0.8,
        typingDurationSeconds: 5,
      },
      {
        text: "Before meeting you, I loved playing in my lab.",
        typingStartDelaySeconds: 0.5,
        typingDurationSeconds: 3,
      },
      {
        text: "I’m so happy you not only fit the flow of the lab",
        typingStartDelaySeconds: 0.4,
        typingDurationSeconds: 3.5,
      },
      {
        text: "But you also add a certain ineffable… <i>je ne sais quoi</i>…",
        typingStartDelaySeconds: 0.35,
        typingDurationSeconds: 4,
      },
      {
        text: "you fill the lab with your unique wisdom and humor. And the way you solve creative problems is really interesting to me.",
        typingStartDelaySeconds: 0.5,
        typingDurationSeconds: 6.5,
      },
      {
        text: "But in general, I’m really grateful that we seamlessly fade in and out of creative energy.",
        typingStartDelaySeconds: 0.7,
        typingDurationSeconds: 5,
      },
      {
        text: "I need fade in and out of creative energy as easily as fading in and out of sleep. And I’m grateful that “you get it”.",
        typingStartDelaySeconds: 1.1,
        typingDurationSeconds: 6.5,
      },
    ],
  },
  goat: {
    messages: [
      {
        text: "Yo",
        typingStartDelaySeconds: 1,
        typingDurationSeconds: 1.5,
      },
      {
        text: "I’m the goat",
        typingStartDelaySeconds: 0.5,
        typingDurationSeconds: 2,
      },
      {
        text: "Anyway",
        typingStartDelaySeconds: 0.7,
        typingDurationSeconds: 1.5,
      },
      {
        text: "Want a pic? ;)",
        typingStartDelaySeconds: 1.1,
        typingDurationSeconds: 2.5,
      },
      {
        type: "image",
        src: "/profiles/goat/chat/goat-butt.jpg",
        alt: "Goat",
        typingStartDelaySeconds: 5,
        typingDurationSeconds: 5,
      },
      {
        text: "wyd tn?",
        typingStartDelaySeconds: 2,
        typingDurationSeconds: 2.5,
      },
    ],
  },
} satisfies Record<string, ProfileChat>;
