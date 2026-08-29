import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);

  &:active {
    background-color: color-mix(in srgb, var(--hinge-black) 4%, #ffffff);
  }
`;

export const Content = styled.div`
  min-width: 0;
  flex: 1;
`;

export const Name = styled.p`
  margin: 0 0 4px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-text);
`;

export const Preview = styled.p`
  margin: 0;
  overflow: hidden;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.35;
  color: var(--color-text-muted);
  text-overflow: ellipsis;
  white-space: nowrap;
`;
