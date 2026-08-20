export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
};

export type TextBlock = {
  type: "text";
  prompt: string;
  answer: string;
};

export type ProfileBlock = ImageBlock | TextBlock;

export type Profile = {
  id: string;
  name: string;
  blocks: ProfileBlock[];
};
