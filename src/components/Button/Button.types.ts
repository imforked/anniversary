import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "transparent";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;
