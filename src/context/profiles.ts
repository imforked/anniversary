import type { Profile } from "./profiles.types";

export const profiles: Profile[] = [
  {
    id: "melissa",
    name: "Melissa",
    blocks: [
      {
        type: "image",
        src: "/melissa-placeholder.svg",
        alt: "Melissa",
      },
      {
        type: "text",
        prompt: "I'm weirdly attracted to",
        answer: "metal... person...",
      },
    ],
  },
];
