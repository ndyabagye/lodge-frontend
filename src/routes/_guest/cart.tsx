import { CartPageTemplate } from "@/components/cart/templates/CartPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/cart")({
  component: CartPage,
});

function CartPage() {
  return <CartPageTemplate />;
}
