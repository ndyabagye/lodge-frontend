import { AdminAccommodationsTemplate } from "@/components/admin/templates/AdminAccommodations";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/accommodations/")({
  component: AdminAccommodationsPage,
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

function AdminAccommodationsPage() {
  return <AdminAccommodationsTemplate />;
}
