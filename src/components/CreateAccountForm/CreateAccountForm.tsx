import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../Button";
import { Modal } from "../Modal";
import * as S from "./CreateAccountForm.styles";
import type { CreateAccountFormProps } from "./CreateAccountForm.types";

const createAccountSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email.")
    .pipe(z.email("Enter a valid email.")),
  password: z
    .string()
    .min(1, "Enter your password.")
    .min(8, "Use at least 8 characters."),
});

type CreateAccountValues = z.infer<typeof createAccountSchema>;

export const CreateAccountForm = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateAccountFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAccountValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = () => {
    reset();
    onSuccess();
  };

  return (
    <Modal isOpen={isOpen} title="Create account" onClose={handleClose}>
      <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <S.Field>
          <S.Label htmlFor="create-name">Name</S.Label>
          <S.Input
            id="create-name"
            type="text"
            autoComplete="name"
            $hasError={Boolean(errors.name)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "create-name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <S.ErrorMessage id="create-name-error">
              {errors.name.message}
            </S.ErrorMessage>
          ) : null}
        </S.Field>

        <S.Field>
          <S.Label htmlFor="create-email">Email</S.Label>
          <S.Input
            id="create-email"
            type="email"
            autoComplete="email"
            $hasError={Boolean(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "create-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <S.ErrorMessage id="create-email-error">
              {errors.email.message}
            </S.ErrorMessage>
          ) : null}
        </S.Field>

        <S.Field>
          <S.Label htmlFor="create-password">Password</S.Label>
          <S.Input
            id="create-password"
            type="password"
            autoComplete="new-password"
            $hasError={Boolean(errors.password)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "create-password-error" : undefined
            }
            {...register("password")}
          />
          {errors.password ? (
            <S.ErrorMessage id="create-password-error">
              {errors.password.message}
            </S.ErrorMessage>
          ) : null}
        </S.Field>

        <Button type="submit" variant="primary">
          Create account
        </Button>
      </S.Form>
    </Modal>
  );
};
