import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { useSearch } from "@tanstack/react-router";

export function ResetPasswordTemplate() {
  const { token, email } = useSearch({ from: "/auth/reset-password" });

  return <ResetPasswordForm token={token} email={email} />;
}
