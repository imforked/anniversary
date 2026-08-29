import { styled } from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
`;

export const Body = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overscroll-behavior: none;
`;

export const Header = styled.div`
  flex-shrink: 0;
  padding: 20px 20px 12px;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  text-align: left;
`;

export const List = styled.div`
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  text-align: center;
`;

export const EmptyTitle = styled.p`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
`;

export const EmptySubtitle = styled.p`
  margin: 0;
  max-width: 280px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-text-muted);
`;
