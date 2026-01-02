import { ForgotPasswordTemplate } from "@/components/auth/templates/ForgotPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return <ForgotPasswordTemplate />;
}
