import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { ZIM_VAT } from "@/lib/constants";

export function CartSummary() {
  const navigate = useNavigate();
  const { items, getSubtotal, getTax, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  const handleCheckout = () => {
    navigate({ to: "/checkout" });
  };

  return (
    <Card className="premium-card bg-white dark:bg-black/60 sticky top-20 border border-gray-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
            <span>
              Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
            <span>Tax ({ZIM_VAT * 100}%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all font-semibold"
          size="lg"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
