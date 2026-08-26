import { motion } from "motion/react";
import { styled } from "styled-components";

export const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
`;

export const NameBar = styled.div`
  position: relative;
  z-index: 5;
  flex-shrink: 0;
  background-color: #ffffff;
`;

export const Body = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
`;

export const Scrollable = styled.div`
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: none;
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 96px;
`;

export const FeedCard = styled(motion.div)`
  width: 100%;
`;

export const PassButton = styled(motion.button)`
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  color: var(--color-text);
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(26, 26, 26, 0.16);

  svg {
    width: 30px;
    height: 30px;
  }
`;
