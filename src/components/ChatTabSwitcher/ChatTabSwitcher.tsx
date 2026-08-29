import { useLayoutEffect, useRef, useState } from "react";
import * as S from "./ChatTabSwitcher.styles";

type ChatTab = "chat" | "profile";

type ChatTabSwitcherProps = {
  activeTab: ChatTab;
  onTabChange: (tab: ChatTab) => void;
};

type IndicatorMetrics = {
  left: number;
  width: number;
};

export const ChatTabSwitcher = ({
  activeTab,
  onTabChange,
}: ChatTabSwitcherProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = useState<IndicatorMetrics>({
    left: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const activeRef = activeTab === "chat" ? chatRef : profileRef;
    const row = rowRef.current;
    const tab = activeRef.current;

    if (!row || !tab) {
      return;
    }

    const rowRect = row.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    setIndicator({
      left: tabRect.left - rowRect.left,
      width: tabRect.width,
    });
  }, [activeTab]);

  return (
    <S.Switcher>
      <S.TabsRow ref={rowRef}>
        <S.Tab
          ref={chatRef}
          type="button"
          $active={activeTab === "chat"}
          onClick={() => onTabChange("chat")}
        >
          Chat
        </S.Tab>
        <S.Separator aria-hidden="true">/</S.Separator>
        <S.Tab
          ref={profileRef}
          type="button"
          $active={activeTab === "profile"}
          onClick={() => onTabChange("profile")}
        >
          Profile
        </S.Tab>
        <S.Indicator
          animate={{
            left: indicator.left,
            width: indicator.width,
          }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        />
      </S.TabsRow>
    </S.Switcher>
  );
};
