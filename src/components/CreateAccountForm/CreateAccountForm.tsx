import { useState, type FormEvent } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import * as S from "./CreateAccountForm.styles";
import type { CreateAccountFormProps } from "./CreateAccountForm.types";

export const CreateAccountForm = ({
  isOpen,
  onClose,
}: CreateAccountFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
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

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} title="Create account" onClose={handleClose}>
      <S.Form onSubmit={handleSubmit} noValidate>
        <S.Field>
          <S.Label htmlFor="create-name">Name</S.Label>
          <S.Input
            id="create-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label htmlFor="create-email">Email</S.Label>
          <S.Input
            id="create-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label htmlFor="create-password">Password</S.Label>
          <S.Input
            id="create-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </S.Field>

        {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}

        <Button type="submit" variant="primary">
          Create account
        </Button>
      </S.Form>
    </Modal>
  );
};
