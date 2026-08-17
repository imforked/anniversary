import { useEffect, useState } from "react";
import * as S from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

export const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = (
    event: React.AnimationEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (!isOpen) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <S.Overlay
      $isOpen={isOpen}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <S.Panel
        $isOpen={isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <S.Header>
          <S.Title id="modal-title">{title}</S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label="Close">
            ×
          </S.CloseButton>
        </S.Header>
        {children}
      </S.Panel>
    </S.Overlay>
  );
};
