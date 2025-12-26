import { createFileRoute, redirect } from "@tanstack/react-router";
import { AccountDashboardTemplate } from "@/components/account/templates/AccountDashboard";

export const Route = createFileRoute("/account/")({
  component: AccountPage,
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw redirect({ to: "/auth/login" });
    }
  },
});

function AccountPage() {
  return <AccountDashboardTemplate />;
}
