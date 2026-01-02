import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminDashboardTemplate } from "@/components/admin/templates/AdminDashboard";

export const Route = createFileRoute("/_admin/admin/dashboard")({
  component: AdminDashboardPage,
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth-storage");

    if (!token) {
      throw redirect({ to: "/auth/login" });
    }

    // Check if user is admin
    if (userStr) {
      const { state } = JSON.parse(userStr);
      if (state?.user?.role !== "admin") {
        throw redirect({ to: "/account" });
      }
    }
  },
});

function AdminDashboardPage() {
  return <AdminDashboardTemplate />;
}
