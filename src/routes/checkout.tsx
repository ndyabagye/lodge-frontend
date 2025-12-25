import { CheckoutPageTemplate } from "@/components/booking/templates/CheckoutPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  beforeLoad: ({ context }) => {
    // We'll implement auth check later
    // For now, just render the page
  },
});

function CheckoutPage() {
  return <CheckoutPageTemplate />;
}
