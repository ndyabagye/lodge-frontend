import { AccommodationDetailTemplate } from "@/components/accommodation/templates/AccommodationDetail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities/$slug")({
  component: AccommodationDetailPage,
});

function AccommodationDetailPage() {
  const { slug } = Route.useParams();

  return <AccommodationDetailTemplate slug={slug} />;
}
