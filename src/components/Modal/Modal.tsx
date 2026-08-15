import { useEffect, useState } from "react";
import * as S from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

export const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      // Wait two frames so the closed styles paint before we animate open.
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });

      return () => cancelAnimationFrame(frameId);
    }

    setIsVisible(false);
  }, [isOpen]);

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
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
      $isOpen={isVisible}
      onClick={onClose}
      onTransitionEnd={handleTransitionEnd}
    >
      <S.Panel
        $isOpen={isVisible}
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
