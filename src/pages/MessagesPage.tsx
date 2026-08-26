import { Dashboard } from "../components/Dashboard";
import * as S from "./MessagesPage.styles";

export const MessagesPage = () => {
  return (
    <S.Page>
      <S.Body>
        <S.Title>Messages</S.Title>
        <S.Subtitle>Coming soon.</S.Subtitle>
      </S.Body>
      <Dashboard />
    </S.Page>
  );
};
