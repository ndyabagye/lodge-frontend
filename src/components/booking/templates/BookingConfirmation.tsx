import { useBooking, useGuestBooking } from "@/hooks/use-bookings";
import { Loading } from "@/components/common/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Download,
  Mail,
  Calendar,
  Users,
  FileText,
  Home,
  MapPin,
  Phone,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { bookingService } from "@/services/booking.service";
import { Badge } from "@/components/ui/badge";

export function BookingConfirmationTemplate() {
  const navigate = useNavigate();

  const { id, bookingNumber } = useParams({ strict: false });
  const { email } = useSearch({ strict: false });

  const isGuest = !!bookingNumber;

  const bookingQuery = isGuest
    ? useGuestBooking(bookingNumber as string, email as string)
    : useBooking(id as string);

  const { data: booking, isLoading } = bookingQuery;

  const handleDownloadInvoice = async () => {
    try {
      toast.info("Preparing your invoice...");

      let blob: Blob;

      if (isGuest) {
        // Use guest endpoint
        blob = await bookingService.downloadGuestInvoice(
          bookingNumber!,
          email as string,
        );
      } else {
        // Use authenticated endpoint
        blob = await bookingService.downloadInvoice(id!);
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${booking?.booking_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download invoice. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Booking not found</p>
        <Button onClick={() => navigate({ to: "/" })}>Return to Home</Button>
      </div>
    );
  }

  function calculateNights(checkIn: Date, checkOut: Date): number {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Normalize to midnight to avoid DST / time drift issues
    const start = new Date(checkIn);
    start.setHours(0, 0, 0, 0);

    const end = new Date(checkOut);
    end.setHours(0, 0, 0, 0);

    const diff = end.getTime() - start.getTime();

    return Math.max(0, Math.round(diff / MS_PER_DAY));
  }

  const checkInDate = new Date(booking.check_in_date);
  const checkOutDate = new Date(booking.check_out_date);
  const nights = calculateNights(checkInDate, checkOutDate);

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-normal text-muted-foreground">
            Thank you for your reservation. A confirmation email has been sent
            to{" "}
            <span className="font-medium text-foreground">
              {booking.guest_email}
            </span>
          </p>
        </div>

        {/* Booking Number */}
        <Card className="mb-6 premium-bg-background border-primary/20">
          <CardContent className="pt-0">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Booking Number
              </p>
              <p className="text-3xl font-bold tracking-wider">
                {booking.booking_number}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Save this number to track your booking
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Booking Status */}
        <Card className="mb-6 premium-bg-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Booking Status</span>
              <Badge
                variant={
                  booking.status === "confirmed"
                    ? "default"
                    : booking.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
                className="text-sm capitalize"
              >
                {booking.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Status
                  </p>
                  <p className="font-medium capitalize">
                    {booking.payment_status}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booked On</p>
                  <p className="font-medium">
                    {format(new Date(booking.created_at), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accommodation Details */}
        <Card className="mb-6 premium-bg-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Accommodation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {booking.accommodation?.images?.[0] && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={booking.accommodation.images[0].url}
                  alt={booking.accommodation.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold mb-2">
                {booking.accommodation?.name}
              </h3>
              <p className="text-muted-foreground">
                {booking.accommodation?.short_description}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="font-medium">
                    {format(checkInDate, "EEEE, MMMM dd, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.accommodation?.check_in_time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="font-medium">
                    {format(checkOutDate, "EEEE, MMMM dd, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.accommodation?.check_out_time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="font-medium">
                    {booking.num_adults} Adult
                    {booking.num_adults !== 1 ? "s" : ""}
                    {booking.num_children > 0 &&
                      `, ${booking.num_children} Child${booking.num_children !== 1 ? "ren" : ""}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {nights} Night{nights !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Information */}
        <Card className="mb-6 premium-bg-background border-primary/20">
          <CardHeader>
            <CardTitle>Guest Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {booking.guest_first_name} {booking.guest_last_name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{booking.guest_email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{booking.guest_phone}</p>
                </div>
              </div>
              {booking.special_requests && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Special Requests
                    </p>
                    <p className="text-sm">{booking.special_requests}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="mb-6 premium-bg-background border-primary/20">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(booking.subtotal)}</span>
            </div>
            {booking.tax_amount > 0 && (
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatPrice(booking.tax_amount)}</span>
              </div>
            )}
            {booking.service_fee > 0 && (
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>{formatPrice(booking.service_fee)}</span>
              </div>
            )}
            {booking.cleaning_fee > 0 && (
              <div className="flex justify-between text-sm">
                <span>Cleaning Fee</span>
                <span>{formatPrice(booking.cleaning_fee)}</span>
              </div>
            )}
            {booking.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(booking.discount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Paid</span>
              <span>{formatPrice(booking.total_amount)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-premium-accent hover:text-premium-accent font-semibold"
            onClick={() => navigate({ to: "/" })}
          >
            Return to Home
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-premium-accent hover:text-premium-accent font-semibold"
            onClick={() => navigate({ to: "/account/bookings" })}
          >
            View My Bookings
          </Button>
          <Button
            className="flex-1 gap-2 bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all font-semibold"
            onClick={handleDownloadInvoice}
          >
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
        </div>

        {/* Help Text */}
        <Card className="mt-6 bg-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              If you have any questions about your booking, please contact us at{" "}
              <a
                href="mailto:support@lodge.com"
                className="text-primary hover:underline"
              >
                support@lodge.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
