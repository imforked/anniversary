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
  position: relative;
  z-index: 0;
  width: 100%;
  transform: translateZ(0);
  backface-visibility: hidden;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

export const Form = styled(motion.div)`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
  pointer-events: auto;
`;

export const CommentField = styled.textarea`
  width: 100%;
  min-height: 44px;
  height: 44px;
  padding: 10px 14px;
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
  position: relative;
  z-index: 1;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  padding: 16px 32px;
  border: none;
  /* Keep the hit box rectangular. iOS Safari mis-hit-tests large radii, so
     only the label in the center of a pill receives taps. */
  border-radius: 0;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-text);
  background-color: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 26px;
    background-color: #f3d2b3;
    pointer-events: none;
  }
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
