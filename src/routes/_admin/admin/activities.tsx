import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminActivitiesTemplate } from "@/components/admin/templates/AdminActivities";

export const Route = createFileRoute("/_admin/admin/activities")({
  component: AdminActivitiesPage,
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

function AdminActivitiesPage() {
  return <AdminActivitiesTemplate />;
}
