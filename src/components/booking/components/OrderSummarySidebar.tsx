import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export function OrderSummarySidebar() {
  const { items, getSubtotal, getTax, getTotal } = useCartStore();

  return (
    <div className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4 shadow-xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Order Summary
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
              {item.item?.images?.[0] ? (
                <img
                  src={
                    item.item.images[0].thumbnail_url || item.item.images[0].url
                  }
                  alt={item.item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">
                {item.item?.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {item.check_in_date && item.check_out_date && (
                  <>
                    {new Date(item.check_in_date).toLocaleDateString()} -{" "}
                    {new Date(item.check_out_date).toLocaleDateString()}
                  </>
                )}
              </p>
              <p className="text-sm font-semibold mt-1 text-gray-900 dark:text-gray-100">
                {formatPrice(item.total)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <span>Subtotal</span>
          <span>{formatPrice(getSubtotal())}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <span>Tax (18%)</span>
          <span>{formatPrice(getTax())}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>{formatPrice(getTotal())}</span>
        </div>
      </div>
    </div>
  );
}
