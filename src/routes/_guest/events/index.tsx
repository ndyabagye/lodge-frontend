import { EventListTemplate } from "@/components/events/templates/EventsList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/events/")({
  component: EventsPage,
});

function EventsPage() {
  return <EventListTemplate />;
}
