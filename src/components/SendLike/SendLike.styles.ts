import { motion } from "motion/react";
import { styled } from "styled-components";

export const Root = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
`;

export const Backdrop = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: #ffffff;
`;

export const Scrollable = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* ProfileCard shadow (0 8px 28px) extends ~20px above the card top */
  padding: 24px 16px 32px;
`;

export const CardSlot = styled(motion.div)`
  width: 100%;
`;

export const Form = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CommentField = styled.textarea`
  width: 100%;
  min-height: 56px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-text);
  background-color: #ffffff;
  resize: none;

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 1px;
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

export const SendButton = styled.button`
  width: 100%;
  padding: 16px 32px;
  border: none;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-text);
  background-color: #f3d2b3;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  align-self: center;
  padding: 8px;
  border: none;
  background: none;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
`;
