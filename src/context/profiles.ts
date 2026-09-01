import type { Profile } from "./profiles.types";

export const profiles: Profile[] = [
  {
    id: "melissa",
    name: "Melissa",
    photo: {
      src: "/melissa-placeholder.svg",
      alt: "Melissa",
    },
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
        type: "audio",
        prompt: "Do you agree or disagree that",
        src: "/parrot-sound.mp3",
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
    photo: {
      src: "/melissa-placeholder.svg",
      alt: "Alex",
    },
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

export const getProfileById = (profileId: string) => {
  return profiles.find((profile) => profile.id === profileId);
};
