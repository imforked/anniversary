export type ProfileImage = {
  src: string;
  alt: string;
};

export type ImageBlock = ProfileImage & {
  type: "image";
  prompt?: string;
};

export type TextBlock = {
  type: "text";
  prompt: string;
  answer: string;
};

export type AudioBlock = {
  type: "audio";
  prompt: string;
  src: string;
};

export type VideoBlock = {
  type: "video";
  prompt: string;
  src: string;
};

export type ProfileBlock = ImageBlock | TextBlock | AudioBlock | VideoBlock;

export type Profile = {
  id: string;
  name: string;
  photo: ProfileImage;
  blocks: ProfileBlock[];
};
