import { styled } from "styled-components";

export const Image = styled.img<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;
