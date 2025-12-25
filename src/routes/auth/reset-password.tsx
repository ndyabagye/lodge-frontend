import { ResetPasswordTemplate } from "@/components/auth/templates/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPasswordPage,
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || undefined,
    email: (search.email as string) || undefined,
  }),
});

function ResetPasswordPage() {
  return <ResetPasswordTemplate />;
}
