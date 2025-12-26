import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminBookingsTemplate } from "@/components/admin/templates/AdminBookings";

export const Route = createFileRoute("/admin/bookings")({
  component: AdminBookingsPage,
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

function AdminBookingsPage() {
  return <AdminBookingsTemplate />;
}
