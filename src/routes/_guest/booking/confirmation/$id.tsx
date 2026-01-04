import { createFileRoute } from "@tanstack/react-router";
import { BookingConfirmationTemplate } from "@/components/booking/templates/BookingConfirmation";

export const Route = createFileRoute("/_guest/booking/confirmation/$id")({
  component: BookingConfirmationPage,
});

function BookingConfirmationPage() {
  return <BookingConfirmationTemplate />;
}
