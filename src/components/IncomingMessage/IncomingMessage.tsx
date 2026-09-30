import { useCachedSrc } from "../../utils/useCachedSrc";
import { AudioPrompt } from "../AudioPrompt";
import { ProfileAvatar } from "../ProfileAvatar";
import * as S from "./IncomingMessage.styles";
import type { IncomingMessageProps } from "./IncomingMessage.types";

export const IncomingMessage = ({ photo, message }: IncomingMessageProps) => {
  const imageSrc = useCachedSrc(message.type === "image" ? message.src : "");

  return (
    <S.Row>
      <ProfileAvatar photo={photo} />
      {message.type === "image" ? (
        <S.PhotoBubble>
          <S.Photo src={imageSrc} alt={message.alt} />
        </S.PhotoBubble>
      ) : message.type === "audio" ? (
        <S.AudioBubble>
          <AudioPrompt prompt={message.prompt} src={message.src} compact />
        </S.AudioBubble>
      ) : (
        <S.Bubble dangerouslySetInnerHTML={{ __html: message.text }} />
      )}
    </S.Row>
  );
};
