import { styled } from "styled-components";
import { motion } from "motion/react";

export const Switcher = styled.div`
  flex-shrink: 0;
  padding: 8px 16px 0;
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border);
`;

export const TabsRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding-bottom: 12px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 0;
  border: none;
  background: none;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  color: ${(props) =>
    props.$active ? "var(--color-accent)" : "var(--color-text-muted)"};
  cursor: pointer;
`;

export const Separator = styled.span`
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 300;
  line-height: 1;
  color: color-mix(in srgb, var(--hinge-black) 28%, var(--hinge-white));
`;

export const Indicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 3px;
  border-radius: 3px 3px 0 0;
  background-color: var(--color-accent);
`;
