import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
  padding: 48px 24px;
  text-align: center;
  overflow: hidden;
  overscroll-behavior: none;
`;

export const FadeCover = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 20;
  background-color: var(--color-bg);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
  transition: opacity 0.4s ease;
`;

export const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.65);
  z-index: 0;
`;

export const Scrim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0.15) 60%,
    rgba(0, 0, 0, 0.55) 100%
  );
  z-index: 0;
  pointer-events: none;
`;

export const Top = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const Actions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  max-width: 320px;
`;

export const Wordmark = styled.p`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 50px;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--hinge-white);
`;

export const Headline = styled.span`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--hinge-white);
`;
