import { ActivityDetailTemplate } from "@/components/activities/templates/ActivityDetail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/activities/$slug")({
  component: ActivityDetailPage,
});

function ActivityDetailPage() {
  const { slug } = Route.useParams();

  return <ActivityDetailTemplate slug={slug} />;
}
