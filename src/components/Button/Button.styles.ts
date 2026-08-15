import styled from "styled-components";
import type { ButtonVariant } from "./Button.types";

type StyledButtonProps = {
  $variant: ButtonVariant;
};

export const Button = styled.button<StyledButtonProps>`
  padding: 14px 32px;
  border-radius: 999px;
  border: 2px solid;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  cursor: pointer;

  color: var(--hinge-white);

  background-color: ${(props) =>
    props.$variant === "transparent" ? "transparent" : "var(--color-accent)"};

  border-color: ${(props) =>
    props.$variant === "transparent"
      ? "var(--hinge-white)"
      : "var(--color-accent)"};

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    filter 0.2s ease;

  &:hover {
    ${(props) =>
      props.$variant === "transparent"
        ? `
      color: var(--hinge-black);
      background-color: var(--hinge-white);
      border-color: var(--hinge-white);
    `
        : `
      filter: brightness(1.12);
    `}
  }
`;
