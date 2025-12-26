import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminUsersTemplate } from "@/components/admin/templates/AdminUsers";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth-storage");

    if (!token) {
      throw redirect({ to: "/auth/login" });
    }

    if (userStr) {
      const { state } = JSON.parse(userStr);
      if (state?.user?.role !== "admin") {
        throw redirect({ to: "/account" });
      }
    }
  },
});

function AdminUsersPage() {
  return <AdminUsersTemplate />;
}
