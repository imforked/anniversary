import { motion } from "motion/react";
import { styled } from "styled-components";

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 30;
  background-color: var(--color-bg);
`;

export const Content = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 31;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px;
  pointer-events: none;
`;

export const Photos = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Photo = styled.img<{ $offset: number }>`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 20px rgba(26, 26, 26, 0.12);

  &:not(:first-child) {
    margin-left: ${(props) => props.$offset}px;
  }
`;

export const Title = styled(motion.h2)`
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(2rem, 6vw, 2.75rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
  text-align: center;
`;
