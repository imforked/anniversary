import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProfileById, profiles } from "./profiles";
import type { Profile } from "./profiles.types";
import type { Match } from "./matches.types";

type LikesContextValue = {
  likeProfile: (
    profileId: string,
    data: { comment: string; likedBlock: Match["likedBlock"] },
  ) => void;
  passProfile: (profileId: string) => void;
  availableProfiles: Profile[];
  matches: Match[];
  getMatch: (profileId: string) => Match | undefined;
};

const LikesContext = createContext<LikesContextValue | null>(null);

const buildInitialMessages = (comment: string): Match["messages"] => {
  const messages: Match["messages"] = [];

  if (comment.trim()) {
    messages.push({ sender: "user", text: comment.trim() });
  }

  messages.push({ sender: "them", text: "I'm a teacher" });

  return messages;
};

export const LikesProvider = ({ children }: { children: ReactNode }) => {
  const [likedProfileIds, setLikedProfileIds] = useState<string[]>([]);
  const [passedProfileIds, setPassedProfileIds] = useState<string[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const likeProfile = (
    profileId: string,
    data: { comment: string; likedBlock: Match["likedBlock"] },
  ) => {
    setLikedProfileIds((current) => {
      if (current.includes(profileId)) {
        return current;
      }

      return [...current, profileId];
    });

    setMatches((current) => {
      if (current.some((match) => match.profileId === profileId)) {
        return current;
      }

      return [
        ...current,
        {
          profileId,
          likedBlock: data.likedBlock,
          comment: data.comment,
          messages: buildInitialMessages(data.comment),
          isTyping: true,
        },
      ];
    });
  };

  const passProfile = (profileId: string) => {
    setPassedProfileIds((current) => {
      if (current.includes(profileId)) {
        return current;
      }

      return [...current, profileId];
    });
  };

  const getMatch = useCallback(
    (profileId: string) => {
      return matches.find((match) => match.profileId === profileId);
    },
    [matches],
  );

  const availableProfiles = useMemo(
    () =>
      profiles.filter(
        (profile) =>
          !likedProfileIds.includes(profile.id) &&
          !passedProfileIds.includes(profile.id),
      ),
    [likedProfileIds, passedProfileIds],
  );

  const value = useMemo(
    () => ({
      likeProfile,
      passProfile,
      availableProfiles,
      matches,
      getMatch,
    }),
    [availableProfiles, getMatch, matches],
  );

  return (
    <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);

  if (!context) {
    throw new Error("useLikes must be used within LikesProvider");
  }

  return context;
};

export const useMatchList = () => {
  const { matches } = useLikes();

  return useMemo(
    () =>
      [...matches]
        .reverse()
        .map((match) => {
          const profile = getProfileById(match.profileId);

          if (!profile) {
            return null;
          }

          const lastMessage =
            match.messages[match.messages.length - 1]?.text ?? "";

          return {
            profile,
            lastMessage,
          };
        })
        .filter((entry) => entry !== null),
    [matches],
  );
};
