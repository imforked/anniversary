import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  background-color: var(--color-bg);
`;

export const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 700px;
  min-height: 0;
  overflow: hidden;
`;
