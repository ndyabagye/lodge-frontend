import { TermsPageTemplate } from "@/components/legal/templates/TermsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/terms")({
  component: TermsPage,
});

function TermsPage() {
  return <TermsPageTemplate />;
}
