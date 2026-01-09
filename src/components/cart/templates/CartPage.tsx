import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";

export function CartPageTemplate() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="premium-container py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <ShoppingCart className="h-24 w-24 mx-auto text-gray-400 dark:text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Your cart is empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start adding accommodations and activities to your cart
          </p>
          <Link to="/accommodations" search={{}}>
            <Button
              size="lg"
              className="bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg font-semibold"
            >
              Browse Accommodations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-bg-background py-12">
      <div className="premium-container">
        <h1 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
