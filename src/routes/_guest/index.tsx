import { HomePageTemplate } from "@/components/home/templates/HomePageTemplate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/")({
  component: HomePage,
});

function HomePage() {
  return <HomePageTemplate />;
}
