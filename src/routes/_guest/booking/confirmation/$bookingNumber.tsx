import { BookingConfirmationTemplate } from "@/components/booking/templates/BookingConfirmation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_guest/booking/confirmation/$bookingNumber",
)({
  component: GuestBookingConfirmationPage,
});

function GuestBookingConfirmationPage() {
  return <BookingConfirmationTemplate />;
}
