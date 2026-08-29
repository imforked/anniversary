import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { Loader } from "../components/Loader";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileName } from "../components/ProfileName";
import { SendLike } from "../components/SendLike";
import { useLikes } from "../context/likes";
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

type DiscoverLocationState = {
  fromLogin?: boolean;
};

export const DiscoverPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { availableProfiles, likeProfile, passProfile } = useLikes();
  const showLoaderOnMount = useRef(
    Boolean((location.state as DiscoverLocationState | null)?.fromLogin),
  ).current;
  const [isLoading, setIsLoading] = useState(showLoaderOnMount);
  const [profileIndex, setProfileIndex] = useState(0);
  const [likedIndex, setLikedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const profileCount = availableProfiles.length;
  const profile =
    profileCount === 0
      ? null
      : availableProfiles[profileIndex % profileCount];
  const likedBlock =
    profile && likedIndex !== null ? profile.blocks[likedIndex] : null;

  useEffect(() => {
    if (!showLoaderOnMount) {
      return;
    }

    navigate(".", { replace: true, state: null });

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [navigate, showLoaderOnMount]);

  useEffect(() => {
    if (profileCount === 0) {
      setProfileIndex(0);
      return;
    }

    if (profileIndex >= profileCount) {
      setProfileIndex(0);
    }
  }, [profileCount, profileIndex]);

  const handlePass = () => {
    if (!profile) {
      return;
    }

    passProfile(profile.id);
  };

  const handlePassExitComplete = () => {
    scrollRef.current?.scrollTo(0, 0);
  };

  const handleSendLike = (comment: string) => {
    if (!profile || likedBlock === null) {
      return;
    }

    likeProfile(profile.id);
    setLikedIndex(null);
    navigate(`/messages/${profile.id}`, {
      state: { likedBlock, comment },
    });
  };

  return (
    <LayoutGroup>
      <S.Page>
        {profile ? (
          <S.NameBar>
            <ProfileName name={profile.name} />
          </S.NameBar>
        ) : null}
        <S.Main>
          <S.Body>
            {profile ? (
              <>
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
                      transition={{
                        duration: 0.16,
                        ease: [0.32, 0.72, 0, 1],
                      }}
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
              </>
            ) : (
              <S.EmptyState>That's everyone for now.</S.EmptyState>
            )}
          </S.Body>
          <Dashboard />
          <AnimatePresence>
            {likedBlock && profile ? (
              <SendLike
                block={likedBlock}
                blockLayoutId={`${profile.id}-block-${likedIndex}`}
                onCancel={() => setLikedIndex(null)}
                onSend={handleSendLike}
              />
            ) : null}
          </AnimatePresence>
        </S.Main>
        <Loader isVisible={isLoading} />
      </S.Page>
    </LayoutGroup>
  );
};
