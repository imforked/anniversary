import { Dashboard } from "../components/Dashboard";
import * as S from "./MessagesPage.styles";

export const MessagesPage = () => {
  return (
    <S.Page>
      <S.Body>
        <S.Title>No messages yet</S.Title>
        <S.Subtitle>
          When you match with someone, you can start chatting here.
        </S.Subtitle>
      </S.Body>
      <Dashboard />
    </S.Page>
  );
};
