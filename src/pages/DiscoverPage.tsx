import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader } from "../components/Loader";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileName } from "../components/ProfileName";
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

export const DiscoverPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileIndex, setProfileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const profile = profiles[profileIndex];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [profileIndex]);

  const handlePass = () => {
    setProfileIndex(
      (currentIndex) => (currentIndex + 1) % profiles.length,
    );
  };

  return (
    <S.Page>
      <S.Scrollable ref={scrollRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
          >
            <ProfileName name={profile.name} />
            <S.Feed>
              {profile.blocks.map((block, index) => {
                if (block.type === "image") {
                  return (
                    <ProfileCard
                      key={`${profile.id}-${index}`}
                      variant="image"
                      src={block.src}
                      alt={block.alt}
                    />
                  );
                }

                return (
                  <ProfileCard
                    key={`${profile.id}-${index}`}
                    variant="text"
                    prompt={block.prompt}
                    answer={block.answer}
                  />
                );
              })}
            </S.Feed>
          </motion.div>
        </AnimatePresence>
      </S.Scrollable>
      <S.PassButton type="button" aria-label="Pass" onClick={handlePass}>
        <PassIcon />
      </S.PassButton>
      <Loader isVisible={isLoading} />
    </S.Page>
  );
};
