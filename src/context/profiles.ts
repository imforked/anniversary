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
        answer:
          "metal... person...metal... person...metal... person...metal... person...metal... person...metal... person...metal... person...metal... person...",
      },
      {
        type: "image",
        src: "/melissa-placeholder.svg",
        alt: "Melissa",
      },
    ],
  },
  {
    id: "alex",
    name: "Alex",
    blocks: [
      {
        type: "image",
        src: "/melissa-placeholder.svg",
        alt: "Alex",
      },
      {
        type: "text",
        prompt: "My simple pleasure",
        answer: "Morning coffee on the porch.",
      },
    ],
  },
];
