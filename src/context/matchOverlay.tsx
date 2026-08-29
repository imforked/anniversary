import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProfileImage } from "./profiles.types";

type MatchOverlayState = {
  profileId: string;
  matchPhoto: ProfileImage;
};

type MatchOverlayContextValue = {
  matchOverlay: MatchOverlayState | null;
  startMatch: (profileId: string, matchPhoto: ProfileImage) => void;
  clearMatch: () => void;
};

const MatchOverlayContext = createContext<MatchOverlayContextValue | null>(
  null,
);

export const MatchOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [matchOverlay, setMatchOverlay] = useState<MatchOverlayState | null>(
    null,
  );

  const startMatch = useCallback(
    (profileId: string, matchPhoto: ProfileImage) => {
      setMatchOverlay({ profileId, matchPhoto });
    },
    [],
  );

  const clearMatch = useCallback(() => {
    setMatchOverlay(null);
  }, []);

  const value = useMemo(
    () => ({
      matchOverlay,
      startMatch,
      clearMatch,
    }),
    [matchOverlay, startMatch, clearMatch],
  );

  return (
    <MatchOverlayContext.Provider value={value}>
      {children}
    </MatchOverlayContext.Provider>
  );
};

export const useMatchOverlay = () => {
  const context = useContext(MatchOverlayContext);

  if (!context) {
    throw new Error("useMatchOverlay must be used within MatchOverlayProvider");
  }

  return context;
};
