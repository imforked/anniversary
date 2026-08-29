import { Navigate, useNavigate, useParams } from "react-router-dom";
import { profiles } from "../context/profiles";
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
  const profile = profiles.find((entry) => entry.id === profileId);

  if (!profile) {
    return <Navigate to="/messages" replace />;
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
      <S.Body />
    </S.Page>
  );
};
