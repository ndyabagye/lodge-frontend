import { PrivacyPageTemplate } from "@/components/legal/templates/PrivacyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: -,
});

function PrivacyPage() {
  return <PrivacyPageTemplate />;
}
