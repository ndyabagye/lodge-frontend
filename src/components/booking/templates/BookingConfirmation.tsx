import { useBooking } from "@/hooks/use-bookings";
import { Loading } from "@/components/common/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Download, Mail, Calendar, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { Link } from "@tanstack/react-router";

interface BookingConfirmationTemplateProps {
  bookingId: string;
}

export function BookingConfirmationTemplate({
  bookingId,
}: BookingConfirmationTemplateProps) {
  const { data: booking, isLoading } = useBooking(bookingId);

  if (isLoading) return <Loading />;

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-destructive">Booking not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your booking. A confirmation email has been sent to{" "}
            <span className="font-medium">{booking.guest_email}</span>
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Booking Details</span>
              <span className="text-sm font-normal text-muted-foreground">
                #{booking.booking_number}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Guest Information */}
            <div>
              <h3 className="font-semibold mb-3">Guest Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  <span className="font-medium">
                    {booking.guest_first_name} {booking.guest_last_name}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.guest_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.num_guests} guests</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Stay Details */}
            <div>
              <h3 className="font-semibold mb-3">Stay Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(
                      new Date(booking.check_in_date),
                      "EEEE, MMMM dd, yyyy",
                    )}{" "}
                    -{" "}
                    {format(
                      new Date(booking.check_out_date),
                      "EEEE, MMMM dd, yyyy",
                    )}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Check-in: 2:00 PM | Check-out: 11:00 AM
                </p>
              </div>
            </div>
            <Separator />

            {/* Payment Summary */}
            <div>
              <h3 className="font-semibold mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(booking.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(booking.tax_amount)}</span>
                </div>
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
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Paid</span>
                  <span>{formatPrice(booking.total_amount)}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">
                    Payment Status
                  </span>
                  <span className="text-sm font-medium text-green-600 capitalize">
                    {booking.payment_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {booking.special_requests && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Special Requests</h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.special_requests}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
          <Button variant="outline" size="lg">
            <Mail className="h-4 w-4 mr-2" />
            Email Confirmation
          </Button>
        </div>

        {/* What's Next */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <p className="font-medium">Check your email</p>
                <p className="text-muted-foreground">
                  We've sent a confirmation email with all the details
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <p className="font-medium">Prepare for your stay</p>
                <p className="text-muted-foreground">
                  Review the check-in instructions and house rules
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <p className="font-medium">
                  Check-in on{" "}
                  {format(new Date(booking.check_in_date), "MMMM dd")}
                </p>
                <p className="text-muted-foreground">
                  Arrive after 2:00 PM and enjoy your stay!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link to="/account/bookings" className="flex-1">
            <Button className="w-full" size="lg">
              View My Bookings
            </Button>
          </Link>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
