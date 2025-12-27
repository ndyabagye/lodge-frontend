import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminReportsTemplate } from "@/components/admin/templates/AdminReports";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReportsPage,
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

function AdminReportsPage() {
  return <AdminReportsTemplate />;
}
