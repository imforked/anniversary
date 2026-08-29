import { keyframes, styled } from "styled-components";

const bounce = keyframes`
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.35;
  }

  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 0 16px;
`;

export const Bubble = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 52px;
  padding: 14px 16px;
  border-radius: 16px 16px 16px 4px;
  background-color: #ececec;
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-text-muted);
  animation: ${bounce} 1.2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.15s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`;
