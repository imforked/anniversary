import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { profiles } from "./profiles";
import type { Profile } from "./profiles.types";

type LikesContextValue = {
  likeProfile: (profileId: string) => void;
  passProfile: (profileId: string) => void;
  availableProfiles: Profile[];
};

const LikesContext = createContext<LikesContextValue | null>(null);

export const LikesProvider = ({ children }: { children: ReactNode }) => {
  const [likedProfileIds, setLikedProfileIds] = useState<string[]>([]);
  const [passedProfileIds, setPassedProfileIds] = useState<string[]>([]);

  const likeProfile = (profileId: string) => {
    setLikedProfileIds((current) => {
      if (current.includes(profileId)) {
        return current;
      }

      return [...current, profileId];
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
    () => ({ likeProfile, passProfile, availableProfiles }),
    [availableProfiles],
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
