import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  button {
    width: 100%;
  }
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

export const Label = styled.label`
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid
    ${(props) => (props.$hasError ? "#b42318" : "var(--color-border)")};
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--color-text);
  background-color: var(--hinge-white);

  &:focus {
    outline: 2px solid
      ${(props) => (props.$hasError ? "#b42318" : "var(--color-accent)")};
    outline-offset: 1px;
  }
`;

export const ErrorMessage = styled.p`
  position: absolute;
  top: 100%;
  left: 0;
  margin: 2px 0 0;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
  color: #b42318;
  text-align: left;
`;
