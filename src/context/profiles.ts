import type { Profile } from "./profiles.types";

export const profiles: Profile[] = [
  {
    id: "kari-walks",
    name: "Kari Walks",
    photo: {
      src: "/profiles/kari-walks/pfp.png",
      alt: "Kari Flowers",
    },
    blocks: [
      {
        type: "image",
        src: "/profiles/kari-walks/pfp.jpg",
        alt: "Kari Walks",
      },
      {
        type: "image",
        src: "/profiles/kari-walks/curious-dom.jpg",
        alt: "Dom looking at a cool plant.",
      },
      {
        type: "image",
        src: "/profiles/kari-walks/lil-guy.jpg",
        alt: "Kari's lil guy",
      },
      {
        type: "text",
        prompt: "Green flags I look for",
        answer: "Learning from my fav girl.",
      },
      {
        type: "video",
        src: "/profiles/kari-walks/swingin.mp4",
      },
      {
        type: "image",
        src: "/profiles/kari-walks/hehehe.jpg",
        alt: "After some good segs.",
        prompt: "My most spontaneous moment",
      },
      {
        type: "image",
        src: "/profiles/kari-walks/choochs-waterfall.jpg",
        alt: "Chooch's waterfall",
      },
      {
        type: "image",
        src: "/profiles/kari-walks/magic.jpg",
        alt: "We found magic.",
      },
      {
        type: "image",
        src: "/profiles/kari-walks/sweet-treat.jpg",
        alt: "Mid-walk sweet treat.",
      },
    ],
  },
  {
    id: "goat",
    name: "Goat",
    photo: {
      src: "/melissa-placeholder.svg",
      alt: "Goat",
    },
    blocks: [
      {
        type: "image",
        src: "/profiles/goat/pfp.png",
        alt: "Goat",
      },
      {
        type: "text",
        prompt: "I go crazy for",
        answer: "Kari's garden",
      },
      {
        type: "audio",
        prompt: "My hot take",
        src: "/profiles/goat/goat-screaming.m4a",
      },
      {
        type: "text",
        prompt: "I'm convinced that",
        answer: "you're the goat, the loml",
      },
    ],
  },
  {
    id: "parrot",
    name: "Parrot",
    photo: {
      src: "/profiles/parrot/pfp.png",
      alt: "Parrot",
    },
    blocks: [
      {
        type: "image",
        src: "/profiles/parrot/pfp.png",
        alt: "Parrot",
      },
      {
        type: "text",
        prompt: "I won't shut up about",
        answer: "Metal... Paper...",
      },
      {
        type: "audio",
        prompt: "I'm convinced that",
        src: "/profiles/parrot/parrot-ily.m4a",
      },
      {
        type: "text",
        prompt: "What if I told you",
        answer: "You're so cute.",
      },
      {
        type: "text",
        prompt: "Together we could",
        answer: "Have good conversations and learn tricks.",
      },
    ],
  },
  {
    id: "our-good-times",
    name: "Our Good Times",
    photo: {
      src: "/profiles/good-times/pfp.jpg",
      alt: "Our Good Times",
    },
    blocks: [
      {
        type: "image",
        src: "/profiles/good-times/pfp.jpg",
        alt: "Our Good Times",
      },
      {
        type: "video",
        prompt: "My love language is",
        src: "/profiles/good-times/cigars.mp4",
      },
      {
        type: "image",
        src: "/profiles/good-times/berries.jpg",
        alt: "Kari picking berries.",
      },
      {
        type: "text",
        prompt: "My simple pleasures",
        answer: "Cuddling & holding hands with you.",
      },
      {
        type: "image",
        src: "/profiles/good-times/beautiful-breakfast.jpg",
        alt: "A beautiful breakfast made by Kari.",
        prompt: "The key to my heart is",
      },
      {
        type: "image",
        src: "/profiles/good-times/wiener.jpg",
        alt: "Dom eating a wiener.",
      },
      {
        type: "video",
        prompt: "My love language is",
        src: "/profiles/good-times/shoot-gun.mp4",
      },
      {
        type: "image",
        src: "/profiles/good-times/bday-tea.jpg",
        alt: "Dom's bday tea ceremony.",
        prompt: "My happy place",
      },
      {
        type: "image",
        src: "/profiles/good-times/bleach.jpg",
        alt: "Kari bleaching.",
      },
      {
        type: "image",
        src: "/profiles/good-times/kari-cabin-smoking.jpg",
        alt: "Kari smoking in our weekend getaway.",
        prompt: "I go crazy for",
      },
      {
        type: "image",
        src: "/profiles/good-times/clam-spread.jpg",
        alt: "Kari showing clam.",
      },
      {
        type: "image",
        src: "/profiles/good-times/the-goat.jpg",
        alt: "Kari is the goat.",
        prompt: "Green flags I look for",
      },
    ],
  },
];

export const getProfileById = (profileId: string) => {
  return profiles.find((profile) => profile.id === profileId);
};
