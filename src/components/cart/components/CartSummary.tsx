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
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (18%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
