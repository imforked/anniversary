import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-bg);
`;

export const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 700px;
`;
