import { styled } from "styled-components";

export const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px 24px 32px;
`;

export const PromptCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 80%;
`;

export const PromptSurface = styled.div`
  align-self: stretch;
  border-radius: 12px;
  background-color: #f2f2f2;
  overflow: hidden;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 24px 24px;
  text-align: left;
`;

export const Prompt = styled.p`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
`;

export const Answer = styled.p`
  margin: 0;
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-text);
`;

export const Photo = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const CommentBubble = styled.p`
  max-width: min(240px, 90%);
  margin: -12px 16px 0 0;
  padding: 12px 16px;
  border-radius: 16px 16px 4px 16px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.35;
  color: var(--color-text);
  background-color: #f3d2b3;
  box-shadow: 0 2px 8px rgba(26, 26, 26, 0.08);
`;
