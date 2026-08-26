import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Dashboard } from "../components/Dashboard";
import { Loader } from "../components/Loader";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileName } from "../components/ProfileName";
import { SendLike } from "../components/SendLike";
import { profiles } from "../context/profiles";
import * as S from "./DiscoverPage.styles";

const PassIcon = () => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

const layoutTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1] as const,
};

export const DiscoverPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileIndex, setProfileIndex] = useState(0);
  const [likedIndex, setLikedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const profile = profiles[profileIndex];
  const likedBlock = likedIndex === null ? null : profile.blocks[likedIndex];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handlePass = () => {
    setProfileIndex((currentIndex) => (currentIndex + 1) % profiles.length);
  };

  const handlePassExitComplete = () => {
    scrollRef.current?.scrollTo(0, 0);
  };

  return (
    <LayoutGroup>
      <S.Page>
        <S.NameBar>
          <ProfileName name={profile.name} />
        </S.NameBar>
        <S.Main>
          <S.Body>
            <S.Scrollable ref={scrollRef}>
              <AnimatePresence
                mode="wait"
                onExitComplete={handlePassExitComplete}
              >
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
                >
                  <S.Feed>
                    {profile.blocks.map((block, index) => {
                      const blockLayoutId = `${profile.id}-block-${index}`;

                      return (
                        <S.FeedCard
                          key={blockLayoutId}
                          layoutId={blockLayoutId}
                          layout
                          transition={layoutTransition}
                        >
                          <ProfileCard
                            block={block}
                            showLikeButton={likedIndex !== index}
                            onLike={() => setLikedIndex(index)}
                          />
                        </S.FeedCard>
                      );
                    })}
                  </S.Feed>
                </motion.div>
              </AnimatePresence>
            </S.Scrollable>
            <AnimatePresence>
              {likedBlock === null ? (
                <S.PassButton
                  type="button"
                  aria-label="Pass"
                  onClick={handlePass}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                >
                  <PassIcon />
                </S.PassButton>
              ) : null}
            </AnimatePresence>
          </S.Body>
          <Dashboard />
          <AnimatePresence>
            {likedBlock ? (
              <SendLike
                block={likedBlock}
                blockLayoutId={`${profile.id}-block-${likedIndex}`}
                onCancel={() => setLikedIndex(null)}
              />
            ) : null}
          </AnimatePresence>
        </S.Main>
        <Loader isVisible={isLoading} />
      </S.Page>
    </LayoutGroup>
  );
};
