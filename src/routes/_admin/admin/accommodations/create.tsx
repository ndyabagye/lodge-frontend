import { CreateAccommodationForm } from "@/components/accommodation/components/forms/CreateAccommodationForm";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/accommodations/create")({
  component: AdminAccommodationsCreatePage,
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

function AdminAccommodationsCreatePage() {
  return <CreateAccommodationForm />;
}
