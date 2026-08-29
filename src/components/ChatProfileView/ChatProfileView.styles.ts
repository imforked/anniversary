import { styled } from "styled-components";

export const Scrollable = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: none;
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px 32px;
`;

export const FeedCard = styled.div`
  width: 100%;
`;
