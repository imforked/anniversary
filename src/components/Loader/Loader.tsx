import * as S from "./Loader.styles";
import type { LoaderProps } from "./Loader.types";

export const Loader = ({ isVisible }: LoaderProps) => {
  return (
    <S.Overlay $isVisible={isVisible} aria-hidden={!isVisible}>
      <S.Spinner role="status" aria-label="Loading" />
    </S.Overlay>
  );
};
