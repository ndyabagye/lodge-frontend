import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPageTemplate } from "@/components/booking/templates/CheckoutPage";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  return <CheckoutPageTemplate />;
}
