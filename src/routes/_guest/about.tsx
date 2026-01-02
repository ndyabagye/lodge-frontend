import { AboutPageTemplate } from "@/components/about/templates/AboutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/about")({
  component: AboutPage,
});

function AboutPage() {
  return <AboutPageTemplate />;
}
