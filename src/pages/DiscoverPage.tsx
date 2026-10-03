import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { Loader } from "../components/Loader";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileName } from "../components/ProfileName";
import { SendLike } from "../components/SendLike";
import { useLikes } from "../context/likes";
import { useMatchOverlay } from "../context/matchOverlay";
import { getProfileById } from "../context/profiles";
import type { Profile, ProfileImage } from "../context/profiles.types";
import { getCachedAssetUrl } from "../utils/assetCache";
import {
  preloadProfileAssets,
  prioritizeProfileAssets,
  waitForProfileAssets,
} from "../utils/preloadProfileAssets";
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
  duration: 0.32,
  ease: [0.32, 0.72, 0, 1] as const,
};

const passTransition = {
  duration: 0.32,
  ease: [0.32, 0.72, 0, 1] as const,
};

type DiscoverLocationState = {
  fromLogin?: boolean;
};

type PendingMatch = {
  profileId: string;
  photo: ProfileImage;
};

const warmImage = (src: string) => {
  const image = new Image();
  image.src = getCachedAssetUrl(src);

  return image.decode?.().catch(() => undefined);
};

const warmProfileImages = (person: Profile) => {
  warmImage(person.photo.src);

  for (const block of person.blocks) {
    if (block.type === "image") {
      warmImage(block.src);
    }
  }
};

const renderFeed = (
  person: Profile,
  options: {
    interactive: boolean;
    likedIndex: number | null;
    suppressLayout?: boolean;
    onLike?: (index: number) => void;
  },
) => {
  const useLayout = options.interactive && !options.suppressLayout;

  return (
    <S.Feed>
      {person.blocks.map((block, index) => {
        const blockLayoutId = `${person.id}-block-${index}`;
        const isSelected = options.interactive && options.likedIndex === index;

        return (
          <S.FeedCard
            key={blockLayoutId}
            layout={useLayout}
            layoutId={useLayout ? blockLayoutId : undefined}
            transition={layoutTransition}
            style={
              options.interactive && options.likedIndex !== null && !isSelected
                ? { visibility: "hidden" }
                : undefined
            }
          >
            <ProfileCard
              block={block}
              showLikeButton={options.interactive && !isSelected}
              mediaActive={options.interactive}
              onLike={
                options.interactive && options.onLike
                  ? () => options.onLike?.(index)
                  : undefined
              }
            />
          </S.FeedCard>
        );
      })}
    </S.Feed>
  );
};

export const DiscoverPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { availableProfiles, likeProfile, passProfile } = useLikes();
  const { startMatch } = useMatchOverlay();
  const showLoaderOnMount = useRef(
    Boolean((location.state as DiscoverLocationState | null)?.fromLogin),
  ).current;
  const [isLoading, setIsLoading] = useState(showLoaderOnMount);
  const [profileIndex, setProfileIndex] = useState(0);
  const [likedIndex, setLikedIndex] = useState<number | null>(null);
  const [isPassing, setIsPassing] = useState(false);
  const [pendingMatch, setPendingMatch] = useState<PendingMatch | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const profileCount = availableProfiles.length;
  const profile =
    profileCount === 0 ? null : availableProfiles[profileIndex % profileCount];
  const visibleProfile = pendingMatch
    ? getProfileById(pendingMatch.profileId)
    : profile;
  const likedBlock =
    visibleProfile && likedIndex !== null
      ? visibleProfile.blocks[likedIndex]
      : null;
  const nextProfile =
    profile && profileCount >= 2 && !pendingMatch
      ? availableProfiles[(profileIndex + 1) % profileCount]
      : null;

  useEffect(() => {
    let cancelled = false;

    if (showLoaderOnMount) {
      navigate(".", { replace: true, state: null });
    }

    const finishLoading = async () => {
      await waitForProfileAssets(showLoaderOnMount ? 1200 : 0);

      if (!cancelled) {
        setIsLoading(false);
      }
    };

    if (showLoaderOnMount) {
      void finishLoading();
    } else {
      void preloadProfileAssets();
    }

    return () => {
      cancelled = true;
    };
  }, [navigate, showLoaderOnMount]);

  useEffect(() => {
    if (!visibleProfile) {
      return;
    }

    prioritizeProfileAssets(visibleProfile.id);

    if (profileCount < 2 || pendingMatch) {
      return;
    }

    const upcoming = availableProfiles[(profileIndex + 1) % profileCount];

    if (upcoming && upcoming.id !== visibleProfile.id) {
      prioritizeProfileAssets(upcoming.id);
      warmProfileImages(upcoming);
    }
  }, [
    availableProfiles,
    pendingMatch,
    profileCount,
    profileIndex,
    visibleProfile,
  ]);

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

    setIsPassing(true);
    passProfile(profile.id);
  };

  const handlePassExitComplete = () => {
    scrollRef.current?.scrollTo(0, 0);
  };

  const handleSendLike = (comment: string) => {
    if (!profile || likedBlock === null) {
      return;
    }

    setPendingMatch({ profileId: profile.id, photo: profile.photo });
    likeProfile(profile.id, { comment, likedBlock });
    startMatch(profile.id, profile.photo);
  };

  return (
    <LayoutGroup>
      <S.Page>
        {visibleProfile ? (
          <S.NameBar>
            <ProfileName name={visibleProfile.name} />
          </S.NameBar>
        ) : null}
        <S.Main>
          <S.Body>
            {visibleProfile ? (
              <>
                <AnimatePresence onExitComplete={handlePassExitComplete}>
                  {visibleProfile ? (
                    <S.Scrollable
                      key={visibleProfile.id}
                      ref={scrollRef}
                      layout={false}
                      initial={{ opacity: 0, x: 24, zIndex: 2 }}
                      animate={{ opacity: 1, x: 0, zIndex: 2 }}
                      exit={{ opacity: 0, x: -24, zIndex: 1 }}
                      transition={passTransition}
                      onAnimationComplete={(definition) => {
                        if (definition === "exit") {
                          return;
                        }

                        setIsPassing(false);
                      }}
                    >
                      {renderFeed(visibleProfile, {
                        interactive: true,
                        likedIndex,
                        suppressLayout: isPassing,
                        onLike: setLikedIndex,
                      })}
                    </S.Scrollable>
                  ) : null}
                  {nextProfile ? (
                    <S.Scrollable
                      key={nextProfile.id}
                      layout={false}
                      aria-hidden="true"
                      initial={{ opacity: 0, x: 24, zIndex: 0 }}
                      animate={{ opacity: 0, x: 24, zIndex: 0 }}
                      transition={passTransition}
                      style={{ pointerEvents: "none" }}
                    >
                      {renderFeed(nextProfile, {
                        interactive: false,
                        likedIndex: null,
                      })}
                    </S.Scrollable>
                  ) : null}
                </AnimatePresence>
                <AnimatePresence>
                  {likedBlock === null && !pendingMatch ? (
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
              <S.EmptyState>
                Loading... More memories coming soon :)
              </S.EmptyState>
            )}
          </S.Body>
          <Dashboard />
          <AnimatePresence>
            {likedBlock && visibleProfile ? (
              <SendLike
                block={likedBlock}
                blockLayoutId={`${visibleProfile.id}-block-${likedIndex}`}
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
