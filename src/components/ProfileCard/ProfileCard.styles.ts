import { styled } from "styled-components";

export const Card = styled.article<{ $square: boolean }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow:
    0 2px 8px rgba(26, 26, 26, 0.06),
    0 8px 28px rgba(26, 26, 26, 0.1);

  ${(props) => (props.$square ? "aspect-ratio: 1 / 1;" : "")}
`;

export const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextContent = styled.div<{ $constrained: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  text-align: left;

  ${(props) =>
    props.$constrained
      ? `
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  `
      : ""}
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

export const TextFade = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  pointer-events: none;
  background: linear-gradient(
    to top,
    #ffffff 12%,
    rgba(255, 255, 255, 0.85) 40%,
    rgba(255, 255, 255, 0)
  );
`;

export const LikeButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  color: var(--color-text);
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(26, 26, 26, 0.16);

  svg {
    width: 22px;
    height: 22px;
  }
`;
