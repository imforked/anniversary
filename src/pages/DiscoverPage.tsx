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

type DiscoverLocationState = {
  fromLogin?: boolean;
};

type PendingMatch = {
  profileId: string;
  photo: ProfileImage;
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
  const [pendingMatch, setPendingMatch] = useState<PendingMatch | null>(null);
  const [isPassing, setIsPassing] = useState(false);
  const isPassingRef = useRef(false);
  const currentLayerRef = useRef<HTMLDivElement>(null);
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

    const nextProfile = availableProfiles[(profileIndex + 1) % profileCount];

    if (nextProfile && nextProfile.id !== visibleProfile.id) {
      prioritizeProfileAssets(nextProfile.id);
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
    if (
      !profile ||
      isPassingRef.current ||
      likedBlock !== null ||
      pendingMatch
    ) {
      return;
    }

    const passedId = profile.id;
    const layer = currentLayerRef.current;

    isPassingRef.current = true;
    setIsPassing(true);

    if (!layer) {
      passProfile(passedId);
      isPassingRef.current = false;
      setIsPassing(false);
      return;
    }

    const animation = layer.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: "translate3d(-112%, 0, 0)" },
      ],
      {
        duration: 420,
        easing: "cubic-bezier(0.32, 0.72, 0, 1)",
        fill: "forwards",
      },
    );

    animation.onfinish = () => {
      passProfile(passedId);
      animation.cancel();
      isPassingRef.current = false;
      setIsPassing(false);
      scrollRef.current?.scrollTo(0, 0);
    };
  };

  const renderProfilePane = (
    person: Profile,
    options: { interactive: boolean },
  ) => {
    return (
      <>
        <S.NameBar>
          <ProfileName name={person.name} />
        </S.NameBar>
        <S.Scrollable ref={options.interactive ? scrollRef : undefined}>
          <S.Feed>
            {person.blocks.map((block, index) => {
              const blockLayoutId = `${person.id}-block-${index}`;
              const isSelected = options.interactive && likedIndex === index;

              return (
                <S.FeedCard
                  key={blockLayoutId}
                  layoutId={
                    options.interactive && isSelected
                      ? blockLayoutId
                      : undefined
                  }
                  transition={layoutTransition}
                  style={
                    options.interactive && likedIndex !== null && !isSelected
                      ? { visibility: "hidden" }
                      : undefined
                  }
                >
                  <ProfileCard
                    block={block}
                    showLikeButton={options.interactive && !isSelected}
                    mediaActive={options.interactive && !isPassing}
                    onLike={
                      options.interactive
                        ? () => setLikedIndex(index)
                        : undefined
                    }
                  />
                </S.FeedCard>
              );
            })}
          </S.Feed>
        </S.Scrollable>
      </>
    );
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
        <S.Main>
          <S.Body>
            {visibleProfile ? (
              <>
                <S.Deck>
                  {nextProfile ? (
                    <S.DeckLayer
                      aria-hidden="true"
                      style={{ zIndex: 0, pointerEvents: "none" }}
                    >
                      {renderProfilePane(nextProfile, { interactive: false })}
                    </S.DeckLayer>
                  ) : null}
                  <S.DeckLayer
                    ref={currentLayerRef}
                    style={{
                      zIndex: 1,
                      pointerEvents: isPassing ? "none" : "auto",
                    }}
                  >
                    {renderProfilePane(visibleProfile, { interactive: true })}
                  </S.DeckLayer>
                </S.Deck>
                <AnimatePresence>
                  {likedBlock === null && !pendingMatch ? (
                    <S.PassButton
                      type="button"
                      aria-label="Pass"
                      onClick={handlePass}
                      disabled={isPassing}
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
