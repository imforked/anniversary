import { styled } from "styled-components";

export const Root = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$compact ? "16px" : "20px")};
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: ${(props) => (props.$compact ? "20px 16px" : "28px")};
  text-align: left;
`;

export const Prompt = styled.p`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
  overflow-wrap: anywhere;
`;

export const Player = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
`;

export const PlayButton = styled.button<{ $compact?: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$compact ? "36px" : "40px")};
  height: ${(props) => (props.$compact ? "36px" : "40px")};
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: #ffffff;
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const Waveform = styled.div<{ $isLoading?: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 1px;
  min-width: 0;
  height: 56px;
  overflow: hidden;
  opacity: ${(props) => (props.$isLoading ? 0.45 : 1)};
  transition: opacity 0.25s ease;
`;

export const Bar = styled.div<{ $height: number; $active: boolean }>`
  flex: 1 1 0;
  width: 0;
  min-width: 0;
  max-width: 3px;
  height: ${(props) => props.$height}px;
  border-radius: 999px;
  background-color: var(--color-accent);
  opacity: ${(props) => (props.$active ? 1 : 0.28)};
  transition: opacity 0.08s linear;
`;
