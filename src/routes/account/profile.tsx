import { createFileRoute } from "@tanstack/react-router";
import { ProfileTemplate } from "@/components/account/templates/Profile";

export const Route = createFileRoute("/account/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return <ProfileTemplate />;
}
