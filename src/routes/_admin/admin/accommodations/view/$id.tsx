import { AdminViewAccommodationDetail } from "@/components/accommodation/components/AdminViewAccommodationDetail";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/accommodations/view/$id")({
  component: AdminViewAccommodationDetailsPage,
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

function AdminViewAccommodationDetailsPage() {
  return <AdminViewAccommodationDetail />;
}
