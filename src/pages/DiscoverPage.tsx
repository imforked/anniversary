import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileName } from "../components/ProfileName";
import { profiles } from "../context/profiles";
import * as S from "./DiscoverPage.styles";

const melissaProfile = profiles[0];

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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <S.Page>
      <S.Scrollable>
        <ProfileName name={melissaProfile.name} />
        <S.Feed>
          {melissaProfile.blocks.map((block, index) => {
            if (block.type === "image") {
              return (
                <ProfileCard
                  key={`${melissaProfile.id}-${index}`}
                  variant="image"
                  src={block.src}
                  alt={block.alt}
                />
              );
            }

            return (
              <ProfileCard
                key={`${melissaProfile.id}-${index}`}
                variant="text"
                prompt={block.prompt}
                answer={block.answer}
              />
            );
          })}
        </S.Feed>
      </S.Scrollable>
      <S.PassButton type="button" aria-label="Pass">
        <PassIcon />
      </S.PassButton>
      <Loader isVisible={isLoading} />
    </S.Page>
  );
};
