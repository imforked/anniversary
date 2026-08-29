import { styled } from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  padding: 12px 16px;
  background-color: #ffffff;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text);
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Name = styled.h1`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
`;

export const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: none;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0 24px;
`;
