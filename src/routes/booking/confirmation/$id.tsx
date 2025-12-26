import { createFileRoute } from "@tanstack/react-router";
import { BookingConfirmationTemplate } from "@/components/booking/templates/BookingConfirmation";

export const Route = createFileRoute("/booking/confirmation/$id")({
  component: BookingConfirmationPage,
});

function BookingConfirmationPage() {
  const { id } = Route.useParams();
  return <BookingConfirmationTemplate bookingId={id} />;
}
