import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const DASHBOARD_HEIGHT = 64;

export const Bar = styled.nav`
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  width: 100%;
  height: ${DASHBOARD_HEIGHT}px;
  background-color: #000000;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  height: 100%;
`;

export const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 100%;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;

  svg {
    width: 28px;
    height: 28px;
  }

  &.active {
    color: #ffffff;
  }
`;

export const Label = styled.span`
  font-family: var(--font-sans);
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
`;
