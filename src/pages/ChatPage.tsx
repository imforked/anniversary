import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ChatProfileView } from "../components/ChatProfileView";
import { ChatTabSwitcher } from "../components/ChatTabSwitcher";
import { IncomingMessage } from "../components/IncomingMessage";
import { LikeIntro } from "../components/LikeIntro";
import { TypingIndicator } from "../components/TypingIndicator";
import { useLikes } from "../context/likes";
import { getProfileById } from "../context/profiles";
import * as S from "./ChatPage.styles";

type ChatTab = "chat" | "profile";

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
  const { profileId } = useParams();
  const { getMatch } = useLikes();
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");
  const bodyRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(false);
  const profile = profileId ? getProfileById(profileId) : undefined;
  const match = profileId ? getMatch(profileId) : undefined;
  const incomingMessages = (match?.messages ?? []).filter(
    (message) => message.sender === "them",
  );

  const updateStickToBottom = () => {
    const body = bodyRef.current;

    if (!body) {
      return;
    }

    const distanceFromBottom =
      body.scrollHeight - body.scrollTop - body.clientHeight;
    stickToBottom.current = distanceFromBottom <= 72;
  };

  const scrollToBottomIfStuck = () => {
    const body = bodyRef.current;

    if (!body || !stickToBottom.current) {
      return;
    }

    body.scrollTop = body.scrollHeight;
  };

  useLayoutEffect(() => {
    if (activeTab !== "chat") {
      return;
    }

    updateStickToBottom();
  }, [activeTab]);

  useLayoutEffect(() => {
    scrollToBottomIfStuck();
  }, [incomingMessages.length, match?.isTyping, activeTab]);

  useEffect(() => {
    const messages = messagesRef.current;

    if (!messages || activeTab !== "chat") {
      return;
    }

    const observer = new ResizeObserver(() => {
      scrollToBottomIfStuck();
    });

    observer.observe(messages);

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  if (!profile || !match) {
    return <Navigate to="/discover" replace />;
  }

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
        <S.Body ref={bodyRef} onScroll={updateStickToBottom}>
          <LikeIntro block={match.likedBlock} comment={match.comment} />
          <S.Messages ref={messagesRef}>
            {incomingMessages.map((message, index) => (
              <IncomingMessage
                key={`${profile.id}-${index}`}
                photo={profile.photo}
                message={message}
              />
            ))}
            <TypingIndicator
              photo={profile.photo}
              isActive={match.isTyping}
            />
          </S.Messages>
        </S.Body>
      ) : (
        <ChatProfileView profile={profile} />
      )}
    </S.Page>
  );
};
