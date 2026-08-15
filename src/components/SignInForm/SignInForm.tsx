import { useState, type FormEvent } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import * as S from "./SignInForm.styles";
import type { SignInFormProps } from "./SignInForm.types";

export const SignInForm = ({ isOpen, onClose }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} title="Sign in" onClose={handleClose}>
      <S.Form onSubmit={handleSubmit} noValidate>
        <S.Field>
          <S.Label htmlFor="sign-in-email">Email</S.Label>
          <S.Input
            id="sign-in-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label htmlFor="sign-in-password">Password</S.Label>
          <S.Input
            id="sign-in-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </S.Field>

        {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}

        <Button type="submit" variant="primary">
          Sign in
        </Button>
      </S.Form>
    </Modal>
  );
};
