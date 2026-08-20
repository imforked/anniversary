export type ProfileCardProps =
  | {
      variant: "image";
      src: string;
      alt: string;
    }
  | {
      variant: "text";
      prompt: string;
      answer: string;
    };
