import { Dashboard } from "../components/Dashboard";
import { MatchListItem } from "../components/MatchListItem";
import { useMatchList } from "../context/likes";
import * as S from "./MessagesPage.styles";

export const MessagesPage = () => {
  const matchList = useMatchList();

  return (
    <S.Page>
      <S.Body>
        {matchList.length > 0 ? (
          <>
            <S.Header>
              <S.Title>Matches</S.Title>
            </S.Header>
            <S.List>
              {matchList.map((match) => (
                <MatchListItem
                  key={match.profile.id}
                  profileId={match.profile.id}
                  name={match.profile.name}
                  photo={match.profile.photo}
                  lastMessage={match.lastMessage}
                />
              ))}
            </S.List>
          </>
        ) : (
          <S.EmptyState>
            <S.EmptyTitle>No messages yet</S.EmptyTitle>
            <S.EmptySubtitle>
              When you match with someone, you can start chatting here.
            </S.EmptySubtitle>
          </S.EmptyState>
        )}
      </S.Body>
      <Dashboard />
    </S.Page>
  );
};
