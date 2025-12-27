import { createFileRoute } from "@tanstack/react-router";
import { FAQPageTemplate } from "@/components/faq/templates/FAQPage";

export const Route = createFileRoute("/faq")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FAQPageTemplate />;
}
