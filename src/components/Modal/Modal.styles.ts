import { styled } from "styled-components";

type OpenProps = {
  $isOpen: boolean;
};

export const Overlay = styled.div<OpenProps>`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: opacity 0.25s ease;
`;

export const Panel = styled.div<OpenProps>`
  width: 100%;
  max-width: 420px;
  max-height: calc(100% - 32px);
  overflow: auto;
  padding: 24px;
  border-radius: 24px;
  background-color: var(--hinge-white);
  color: var(--color-text);
  transform: scale(${(props) => (props.$isOpen ? 1 : 0.96)});
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  margin: 0;
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
`;

export const CloseButton = styled.button`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 999px;
  font-size: 20px;
  line-height: 1;
  color: var(--color-text);
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: color-mix(in srgb, var(--color-text) 8%, transparent);
  }
`;
