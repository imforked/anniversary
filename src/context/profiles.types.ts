export type ProfileImage = {
  src: string;
  alt: string;
};

export type ImageBlock = ProfileImage & {
  type: "image";
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
  photo: ProfileImage;
  blocks: ProfileBlock[];
};
