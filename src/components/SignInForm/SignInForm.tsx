import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../Button";
import { Modal } from "../Modal";
import * as S from "./SignInForm.styles";
import type { SignInFormProps } from "./SignInForm.types";

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email.")
    .pipe(z.email("Enter a valid email.")),
  password: z.string().min(1, "Enter your password."),
});

type SignInValues = z.infer<typeof signInSchema>;

export const SignInForm = ({ isOpen, onClose }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = () => {
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} title="Sign in" onClose={handleClose}>
      <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <S.Field>
          <S.Label htmlFor="sign-in-email">Email</S.Label>
          <S.Input
            id="sign-in-email"
            type="email"
            autoComplete="email"
            $hasError={Boolean(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "sign-in-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <S.ErrorMessage id="sign-in-email-error">
              {errors.email.message}
            </S.ErrorMessage>
          ) : null}
        </S.Field>

        <S.Field>
          <S.Label htmlFor="sign-in-password">Password</S.Label>
          <S.Input
            id="sign-in-password"
            type="password"
            autoComplete="current-password"
            $hasError={Boolean(errors.password)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "sign-in-password-error" : undefined
            }
            {...register("password")}
          />
          {errors.password ? (
            <S.ErrorMessage id="sign-in-password-error">
              {errors.password.message}
            </S.ErrorMessage>
          ) : null}
        </S.Field>

        <Button type="submit" variant="primary">
          Sign in
        </Button>
      </S.Form>
    </Modal>
  );
};
