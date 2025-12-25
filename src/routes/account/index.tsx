import { createFileRoute, redirect } from "@tanstack/react-router";

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
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <p className="text-muted-foreground">Welcome to your account dashboard</p>
    </div>
  );
}
