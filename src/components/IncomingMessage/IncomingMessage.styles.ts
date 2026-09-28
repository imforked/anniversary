import { styled } from "styled-components";

export const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 0 16px;
`;

export const Bubble = styled.p`
  max-width: 75%;
  margin: 0;
  padding: 12px 16px;
  border-radius: 16px 16px 16px 4px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.35;
  color: var(--color-text);
  background-color: #ececec;
`;

export const PhotoBubble = styled.div`
  max-width: 75%;
  overflow: hidden;
  border-radius: 16px 16px 16px 4px;
  background-color: #ececec;
`;

export const Photo = styled.img`
  display: block;
  width: 100%;
  height: auto;
  vertical-align: middle;
`;

export const AudioBubble = styled.div`
  width: min(280px, 75%);
  overflow: hidden;
  border-radius: 16px 16px 16px 4px;
  background-color: #ececec;
`;
