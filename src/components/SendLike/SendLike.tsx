import { useEffect, useRef, useState } from "react";
import { ProfileCard } from "../ProfileCard";
import * as S from "./SendLike.styles";
import type { SendLikeProps } from "./SendLike.types";

const ease = [0.32, 0.72, 0, 1] as const;
const blockDuration = 0.5;

export const SendLike = ({ block, blockLayoutId, onCancel }: SendLikeProps) => {
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const isOpen = useRef(true);
  const formRevealed = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const backupTimer = useRef<number | undefined>(undefined);

  const revealForm = () => {
    if (isOpen.current && !formRevealed.current) {
      formRevealed.current = true;
      setShowForm(true);
    }
  };

  useEffect(() => {
    backupTimer.current = window.setTimeout(
      revealForm,
      blockDuration * 1000 + 100,
    );

    return () => {
      if (backupTimer.current) {
        window.clearTimeout(backupTimer.current);
      }
    };
  }, []);

  const handleLayoutAnimationStart = () => {
    const card = cardRef.current;
    const startTop = card?.getBoundingClientRect().top ?? 0;

    window.setTimeout(() => {
      if (!isOpen.current || formRevealed.current) {
        return;
      }

      const currentTop = card?.getBoundingClientRect().top ?? 0;

      if (Math.abs(currentTop - startTop) < 1) {
        revealForm();
      }
    }, 50);
  };

  const handleLayoutAnimationComplete = () => {
    if (backupTimer.current) {
      window.clearTimeout(backupTimer.current);
    }

    revealForm();
  };

  const handleClose = () => {
    isOpen.current = false;
    setShowForm(false);

    if (backupTimer.current) {
      window.clearTimeout(backupTimer.current);
    }

    onCancel();
  };

  return (
    <S.Root
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: blockDuration, ease }}
    >
      <S.Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease }}
      />
      <S.Scrollable>
        <S.Content>
          <S.CardSlot
            ref={cardRef}
            layoutId={blockLayoutId}
            layout
            transition={{ duration: blockDuration, ease }}
            onLayoutAnimationStart={handleLayoutAnimationStart}
            onLayoutAnimationComplete={handleLayoutAnimationComplete}
          >
            <ProfileCard
              block={block}
              showLikeButton={false}
              constrainTextToSquare
            />
          </S.CardSlot>
          {showForm ? (
            <S.Form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease }}
            >
              <S.CommentField
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Add a comment"
                rows={1}
              />
              <S.SendButton type="button" onClick={handleClose}>
                Send Like
              </S.SendButton>
              <S.CancelButton type="button" onClick={handleClose}>
                Cancel
              </S.CancelButton>
            </S.Form>
          ) : null}
        </S.Content>
      </S.Scrollable>
    </S.Root>
  );
};
