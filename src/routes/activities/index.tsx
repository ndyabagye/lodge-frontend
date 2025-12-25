import { ActivityListTemplate } from "@/components/activities/templates/ActivityList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities/")({
  component: ActivityPage,
});

function ActivityPage() {
  return <ActivityListTemplate />;
}
