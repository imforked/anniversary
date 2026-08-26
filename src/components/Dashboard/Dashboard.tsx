import * as S from "./Dashboard.styles";

const MessagesIcon = () => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3v-3H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Dashboard = () => {
  return (
    <S.Bar>
      <S.Nav>
        <S.Item to="/discover" aria-label="Discover" end>
          <S.Label>H</S.Label>
        </S.Item>
        <S.Item to="/messages" aria-label="Messages">
          <MessagesIcon />
        </S.Item>
      </S.Nav>
    </S.Bar>
  );
};
