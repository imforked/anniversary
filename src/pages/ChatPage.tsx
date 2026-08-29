import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IncomingMessage } from "../components/IncomingMessage";
import { LikeIntro } from "../components/LikeIntro";
import { useLikes } from "../context/likes";
import { getProfileById } from "../context/profiles";
import * as S from "./ChatPage.styles";

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
  const profile = profileId ? getProfileById(profileId) : undefined;
  const match = profileId ? getMatch(profileId) : undefined;

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
        </S.Messages>
      </S.Body>
    </S.Page>
  );
};
