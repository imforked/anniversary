import * as S from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <S.Button type={type} $variant={variant} {...props}>
      {children}
    </S.Button>
  );
};
