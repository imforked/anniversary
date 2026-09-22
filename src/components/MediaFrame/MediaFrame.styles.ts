import { styled } from "styled-components";

export const Root = styled.div<{ $compact?: boolean }>`
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;

  ${(props) =>
    props.$compact
      ? "aspect-ratio: 1 / 1;"
      : "height: 100%;"}
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.08) 36%,
    rgba(0, 0, 0, 0) 56%
  );
`;

export const Prompt = styled.p<{ $compact?: boolean }>`
  position: absolute;
  top: ${(props) => (props.$compact ? "16px" : "20px")};
  left: ${(props) => (props.$compact ? "16px" : "20px")};
  right: ${(props) => (props.$compact ? "16px" : "20px")};
  margin: 0;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
  overflow-wrap: anywhere;
`;
