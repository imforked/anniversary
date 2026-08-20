import { styled } from "styled-components";

export const Card = styled.article<{ $variant: "image" | "text" }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow:
    0 2px 8px rgba(26, 26, 26, 0.06),
    0 8px 28px rgba(26, 26, 26, 0.1);

  ${(props) =>
    props.$variant === "image" ? "aspect-ratio: 1 / 1;" : ""}
`;

export const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
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

export const LikeButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
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
