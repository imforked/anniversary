import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChatProfileView } from "../components/ChatProfileView";
import { ChatTabSwitcher } from "../components/ChatTabSwitcher";
import { IncomingMessage } from "../components/IncomingMessage";
import { ItsAMatch } from "../components/ItsAMatch";
import { LikeIntro } from "../components/LikeIntro";
import { TypingIndicator } from "../components/TypingIndicator";
import { USER_PHOTO } from "../constants/user";
import { useLikes } from "../context/likes";
import { getProfileById } from "../context/profiles";
import * as S from "./ChatPage.styles";

type ChatTab = "chat" | "profile";

type ChatLocationState = {
  showMatch?: boolean;
};

const BackIcon = () => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileId } = useParams();
  const { getMatch } = useLikes();
  const showMatchOnMount = useRef(
    Boolean((location.state as ChatLocationState | null)?.showMatch),
  ).current;
  const [showMatch, setShowMatch] = useState(showMatchOnMount);
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");
  const profile = profileId ? getProfileById(profileId) : undefined;
  const match = profileId ? getMatch(profileId) : undefined;

  useEffect(() => {
    if (!showMatchOnMount) {
      return;
    }

    navigate(".", { replace: true, state: null });
  }, [navigate, showMatchOnMount]);

  const handleMatchComplete = useCallback(() => {
    setShowMatch(false);
  }, []);

  if (!profile) {
    return <Navigate to="/messages" replace />;
  }

  const incomingMessages =
    match?.messages.filter((message) => message.sender === "them") ?? [];

  return (
    <S.Page>
      <S.Header>
        <S.BackButton
          type="button"
          aria-label="Back to messages"
          onClick={() => navigate("/messages")}
        >
          <BackIcon />
        </S.BackButton>
        <S.Name>{profile.name}</S.Name>
      </S.Header>
      <ChatTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "chat" ? (
        <S.Body>
          {match ? (
            <LikeIntro block={match.likedBlock} comment={match.comment} />
          ) : null}
          <S.Messages>
            {incomingMessages.map((message, index) => (
              <IncomingMessage
                key={`${message.text}-${index}`}
                photo={profile.photo}
                text={message.text}
              />
            ))}
            <TypingIndicator
              photo={profile.photo}
              isActive={match?.isTyping ?? false}
            />
          </S.Messages>
        </S.Body>
      ) : (
        <ChatProfileView profile={profile} />
      )}
      {showMatch ? (
        <ItsAMatch
          userPhoto={USER_PHOTO}
          matchPhoto={profile.photo}
          onComplete={handleMatchComplete}
        />
      ) : null}
    </S.Page>
  );
};
