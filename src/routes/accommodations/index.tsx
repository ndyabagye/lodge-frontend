import { AccommodationListTemplate } from "@/components/accommodation/templates/AccommodationList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accommodations/")({
  component: AccomodationsPage,
});

function AccomodationsPage() {
  return <AccommodationListTemplate />;
}
