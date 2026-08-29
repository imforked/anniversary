import type { Profile } from "../../context/profiles.types";
import { ProfileCard } from "../ProfileCard";
import * as S from "./ChatProfileView.styles";

type ChatProfileViewProps = {
  profile: Profile;
};

export const ChatProfileView = ({ profile }: ChatProfileViewProps) => {
  return (
    <S.Scrollable>
      <S.Feed>
        {profile.blocks.map((block, index) => (
          <S.FeedCard key={`${profile.id}-block-${index}`}>
            <ProfileCard block={block} showLikeButton={false} />
          </S.FeedCard>
        ))}
      </S.Feed>
    </S.Scrollable>
  );
};
