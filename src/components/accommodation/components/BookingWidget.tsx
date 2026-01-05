import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  Minus,
  Plus,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCartStore } from "@/stores/cart-store";
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import type { Accommodation } from "@/types";
import type { DateRange } from "react-day-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BookingWidgetProps {
  accommodation: Accommodation;
}

export function BookingWidget({ accommodation }: BookingWidgetProps) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null,
  );
  const [pricingData, setPricingData] = useState<any>(null);

  const totalGuests = numAdults + numChildren;
  const canIncrease = totalGuests < accommodation.max_guests;

  /* -------------------------
   * Guest count logic
   * ------------------------- */
  const handleIncrease = (type: "adults" | "children") => {
    if (!canIncrease) return;
    if (type === "adults") {
      setNumAdults((prev) => prev + 1);
    } else {
      setNumChildren((prev) => prev + 1);
    }
  };

  const handleDecrease = (type: "adults" | "children") => {
    if (type === "adults" && numAdults > 1) {
      setNumAdults((prev) => prev - 1);
    } else if (type === "children" && numChildren > 0) {
      setNumChildren((prev) => prev - 1);
    }
  };

  /* -------------------------
   * Night calculation
   * IMPORTANT:
   * - Checkout date is NOT charged
   * - Matches backend diffInDays / daysUntil logic
   * ------------------------- */
  const nights = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return 0;

    const start = new Date(dateRange.from);
    const end = new Date(dateRange.to);

    // Normalize to midnight to avoid timezone drift
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return Math.max(0, Math.floor(diff));
  }, [dateRange]);

  // const calculateNights = () => {
  //   if (!dateRange?.from || !dateRange?.to) return 0;
  //   const diffTime = dateRange.to.getTime() - dateRange.from.getTime();
  //   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // };

  /* -------------------------
   * Availability + pricing check when dates are selected
   * ------------------------- */
  useEffect(() => {
    const checkAvailability = async () => {
      if (!dateRange?.from || !dateRange?.to) {
        setAvailabilityError(null);
        setPricingData(null);
        return;
      }

      setIsCheckingAvailability(true);
      setAvailabilityError(null);

      try {
        const result = await bookingService.checkAvailability({
          accommodation_id: accommodation.id,
          check_in_date: format(dateRange.from, "yyyy-MM-dd"),
          check_out_date: format(dateRange.to, "yyyy-MM-dd"),
        });

        if (!result.available) {
          setAvailabilityError(
            result.message || "These dates are not available",
          );
          setPricingData(null);
        } else {
          // Store pricing data from backend
          setPricingData(result.pricing);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to check availability";
        setAvailabilityError(errorMessage);
        setPricingData(null);
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    // Debounce the availability check
    const timeoutId = setTimeout(checkAvailability, 400);
    return () => clearTimeout(timeoutId);
  }, [dateRange, accommodation.id]);

  /* -------------------------
   * Pricing resolution
   * Backend first, frontend fallback
   * ------------------------- */
  const subtotal = pricingData?.subtotal ?? accommodation.base_price * nights;

  const serviceFee = pricingData?.service_fee ?? 0;
  const taxAmount = pricingData?.tax_amount ?? 0;
  const cleaningFee =
    pricingData?.cleaning_fee ?? accommodation.cleaning_fee ?? 0;

  const total =
    pricingData?.total_amount ??
    subtotal + serviceFee + taxAmount + cleaningFee;

  // Validate stay duration
  const validateStayDuration = () => {
    if (!dateRange?.from || !dateRange?.to) {
      return {
        valid: false,
        message: "Please select check-in and check-out dates",
      };
    }

    if (nights < 1) {
      return {
        valid: false,
        message: "Check-out date must be after check-in date",
      };
    }

    if (accommodation.minimum_stay && nights < accommodation.minimum_stay) {
      return {
        valid: false,
        message: `Minimum stay is ${accommodation.minimum_stay} night${accommodation.minimum_stay !== 1 ? "s" : ""}`,
      };
    }

    if (accommodation.maximum_stay && nights > accommodation.maximum_stay) {
      return {
        valid: false,
        message: `Maximum stay is ${accommodation.maximum_stay} night${accommodation.maximum_stay !== 1 ? "s" : ""}`,
      };
    }

    // Check availability
    if (availabilityError) {
      return { valid: false, message: availabilityError };
    }

    return { valid: true, message: "" };
  };

  const stayValidation = validateStayDuration();
  const showWarning = dateRange?.from && dateRange?.to && !stayValidation.valid;

  const handleAddToCart = () => {
    if (!stayValidation.valid) {
      toast.error(stayValidation.message);
      return;
    }

    addItem({
      id: `${accommodation.id}-${dateRange!.from!.toISOString()}`,
      type: "accommodation",
      item_id: accommodation.id,
      item: accommodation,
      check_in_date: format(dateRange!.from!, "yyyy-MM-dd"),
      check_out_date: format(dateRange!.to!, "yyyy-MM-dd"),
      num_adults: numAdults,
      num_children: numChildren,
      quantity: 1,
      price: total,
      total: total,
    });

    toast.success("Added to cart!");
  };

  const handleBookNow = () => {
    const validation = validateStayDuration();
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    handleAddToCart();
    navigate({ to: "/checkout" });
  };

  return (
    <Card className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(accommodation.base_price)}
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              / night
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Check-in & Check-out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-300 dark:border-gray-600 bg-white dark:bg-black/60 hover:border-premium-accent dark:hover:border-premium-accent",
                  !dateRange && "text-gray-500 dark:text-gray-400",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <span className="text-gray-900 dark:text-gray-100">
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd, yyyy")}
                    </span>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">
                      {format(dateRange.from, "LLL dd, yyyy")}
                    </span>
                  )
                ) : (
                  <span>Pick dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white dark:bg-black shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700"
              align="start"
            >
              <Calendar
                autoFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
            </PopoverContent>
          </Popover>

          {/* Stay Requirements Info */}
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>
              • Minimum stay: {accommodation.minimum_stay} night
              {accommodation.minimum_stay !== 1 ? "s" : ""}
            </p>
            {accommodation.maximum_stay && (
              <p>
                • Maximum stay: {accommodation.maximum_stay} night
                {accommodation.maximum_stay !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Checking Availability */}
          {isCheckingAvailability && dateRange?.from && dateRange?.to && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>Checking availability...</AlertDescription>
            </Alert>
          )}

          {/* Warning Alert */}
          {showWarning && !isCheckingAvailability && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{stayValidation.message}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Guests Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Guests
          </Label>

          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Adults
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ages 13+
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrease("adults")}
                disabled={numAdults <= 1}
                className="border-gray-300 dark:border-gray-600 hover:border-premium-accent dark:hover:border-premium-accent bg-white dark:bg-gray-800"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
                {numAdults}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrease("adults")}
                disabled={!canIncrease}
                className="border-gray-300 dark:border-gray-600 hover:border-premium-accent dark:hover:border-premium-accent bg-white dark:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Children
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ages 2-12
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDecrease("children")}
                disabled={numChildren <= 0}
                className="border-gray-300 dark:border-gray-600 hover:border-premium-accent dark:hover:border-premium-accent bg-white dark:bg-gray-800"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
                {numChildren}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrease("children")}
                disabled={!canIncrease}
                className="border-gray-300 dark:border-gray-600 hover:border-premium-accent dark:hover:border-premium-accent bg-white dark:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Maximum {accommodation.max_guests} guests
          </p>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Nightly price breakdown (weekday / weekend) */}
            {pricingData?.nightly_breakdown?.length > 0 && (
              <Accordion type="single" collapsible>
                <AccordionItem value="nightly-breakdown">
                  <AccordionTrigger className="text-sm text-gray-600 dark:text-gray-400">
                    View nightly price breakdown
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {pricingData.nightly_breakdown.map((night: any) => (
                        <div
                          key={night.date}
                          className="flex justify-between text-xs"
                        >
                          <span>
                            {format(new Date(night.date), "EEE, MMM dd")}
                            <span className="ml-1 text-muted-foreground">
                              (
                              {night.type === "weekend" ? "Weekend" : "Weekday"}
                              )
                            </span>
                          </span>

                          <span className="font-medium">
                            {formatPrice(night.rate)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            {/*subtotal*/}
            <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100">
              <span>
                {formatPrice(accommodation.base_price)} × {nights} night
                {nights !== 1 ? "s" : ""}
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {/*service fee*/}
            {serviceFee > 0 && (
              <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100">
                <span>Service fee</span>
                <span>{formatPrice(serviceFee)}</span>
              </div>
            )}
            {/*cleaning fee*/}
            {cleaningFee > 0 && (
              <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100">
                <span>Cleaning fee</span>
                <span>{formatPrice(cleaningFee)}</span>
              </div>
            )}
            {/*tax*/}
            {taxAmount > 0 && (
              <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100">
                <span>
                  Tax {pricingData?.tax_rate ? `(${pricingData.tax_rate})` : ""}
                </span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-3 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          size="lg"
          onClick={handleBookNow}
          disabled={!stayValidation.valid || isCheckingAvailability}
        >
          {isCheckingAvailability ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            "Book Now"
          )}
        </Button>
        <Button
          className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-premium-accent hover:text-premium-accent bg-white dark:bg-gray-800 font-semibold"
          onClick={handleAddToCart}
          disabled={!stayValidation.valid || isCheckingAvailability}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
