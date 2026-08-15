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

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--color-text);
  background-color: var(--hinge-white);

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 1px;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: #b42318;
  text-align: left;
`;
