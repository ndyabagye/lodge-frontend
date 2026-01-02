import { RegisterTemplate } from "@/components/auth/templates/Register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return <RegisterTemplate />;
}
