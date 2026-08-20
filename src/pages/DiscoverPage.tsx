import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileName } from "../components/ProfileName";
import * as S from "./DiscoverPage.styles";

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
      <ProfileName name="Melissa" />
      <S.Feed>
        <ProfileCard
          variant="image"
          src="/melissa-placeholder.svg"
          alt="Melissa"
        />
        <ProfileCard
          variant="text"
          prompt="I'm weirdly attracted to"
          answer="metal... person..."
        />
        <p>Parrot</p>
        <p>Baby goat</p>
        <p>
          Late night paint nights (or maybe more generally "Kari teaching me
          about art")
        </p>
        <p>Cigars</p>
        <p>Shooting</p>
        <p>Clamming</p>
        <p>Food traditions like Post-Trauma smoothies and McDonalds</p>
        <p>The soup-thermos incident</p>
        <p>Pumpkin date</p>
        <p>Some of our best emojis</p>
        <p>The ladies (Phoebe and Marty)</p>
        <p>The lovely meals Kari made for me</p>
        <p>Kari teaching me about nature</p>
        <p>Dom (she can finally pick me and I'll tell her I love her :))</p>
      </S.Feed>
      <Loader isVisible={isLoading} />
    </S.Page>
  );
};
