import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getProfileById, profiles } from "./profiles";
import type { Profile } from "./profiles.types";
import type { Match } from "./matches.types";
import { MATCH_OVERLAY_DURATION_SECONDS } from "../components/ItsAMatch";
import {
  getTypingDurationSeconds,
  getTypingStartDelaySeconds,
} from "./chats.types";

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

const wait = (ms: number) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const playIncomingChat = (
  profileId: string,
  setMatches: Dispatch<SetStateAction<Match[]>>,
) => {
  const script = getProfileById(profileId)?.chat?.messages;

  if (!script || script.length === 0) {
    return;
  }

  const run = async () => {
    for (let index = 0; index < script.length; index += 1) {
      const message = script[index];
      const startDelaySeconds = getTypingStartDelaySeconds(message);
      const typingSeconds = getTypingDurationSeconds(message);
      const delayBeforeTypingSeconds =
        index === 0
          ? startDelaySeconds + MATCH_OVERLAY_DURATION_SECONDS
          : startDelaySeconds;

      await wait(delayBeforeTypingSeconds * 1000);

      setMatches((current) =>
        current.map((match) => {
          if (match.profileId !== profileId) {
            return match;
          }

          return {
            ...match,
            isTyping: true,
          };
        }),
      );

      await wait(typingSeconds * 1000);

      setMatches((current) =>
        current.map((match) => {
          if (match.profileId !== profileId) {
            return match;
          }

          return {
            ...match,
            messages: [
              ...match.messages,
              { sender: "them" as const, text: message.text },
            ],
            isTyping: false,
          };
        }),
      );
    }
  };

  void run();
};

export const LikesProvider = ({ children }: { children: ReactNode }) => {
  const [likedProfileIds, setLikedProfileIds] = useState<string[]>([]);
  const [passedProfileIds, setPassedProfileIds] = useState<string[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const likeProfile = (
    profileId: string,
    data: { comment: string; likedBlock: Match["likedBlock"] },
  ) => {
    if (matches.some((match) => match.profileId === profileId)) {
      return;
    }

    setLikedProfileIds((current) => {
      if (current.includes(profileId)) {
        return current;
      }

      return [...current, profileId];
    });

    setMatches((current) => [
      ...current,
      {
        profileId,
        likedBlock: data.likedBlock,
        comment: data.comment,
        messages: [],
        isTyping: false,
      },
    ]);

    playIncomingChat(profileId, setMatches);
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
