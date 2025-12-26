import { useState } from "react";
import { AccountLayout } from "../components/AccountLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useBookings, useCancelBooking } from "@/hooks/use-bookings";
import { Calendar, Users, Download, X } from "lucide-react";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { Loading } from "@/components/common/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function BookingsTemplate() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { data, isLoading } = useBookings();
  const { mutate: cancelBooking } = useCancelBooking();

  const now = new Date();

  const upcomingBookings = data?.data?.filter(
    (booking) =>
      booking.status !== "cancelled" && new Date(booking.check_in_date) >= now,
  );

  const pastBookings = data?.data?.filter(
    (booking) =>
      booking.status === "checked_out" ||
      (booking.status !== "cancelled" &&
        new Date(booking.check_out_date) < now),
  );

  const cancelledBookings = data?.data?.filter(
    (booking) => booking.status === "cancelled",
  );

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(
      { id: bookingId, reason: "User requested cancellation" },
      {
        onSuccess: () => {
          toast.success("Booking cancelled successfully");
        },
      },
    );
  };

  const renderBookingCard = (booking: any, showCancel: boolean = false) => (
    <Card key={booking.id} className="border-border bg-card">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Image placeholder */}
          <div className="w-32 h-32 rounded-lg bg-muted shrink-0" />

          {/* Booking Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">
                    Booking #{booking.booking_number}
                  </h3>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                    }
                    className="capitalize"
                  >
                    {booking.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {booking.guest_first_name} {booking.guest_last_name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {formatPrice(booking.total_amount)}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {booking.payment_status}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(booking.check_in_date), "MMM dd")} -{" "}
                  {format(new Date(booking.check_out_date), "MMM dd, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{booking.num_guests} guests</span>
              </div>
            </div>

            {booking.special_requests && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Special Requests:</p>
                <p className="text-sm text-muted-foreground">
                  {booking.special_requests}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>

              {showCancel && booking.status === "confirmed" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this booking? This
                        action cannot be undone. Please review our cancellation
                        policy.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleCancelBooking(booking.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Cancel Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading)
    return (
      <AccountLayout>
        <Loading />
      </AccountLayout>
    );

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage all your bookings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingBookings && upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) =>
                  renderBookingCard(booking, true),
                )}
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    No upcoming bookings
                  </p>
                  <Button>Book Now</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastBookings && pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) =>
                  renderBookingCard(booking, false),
                )}
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No past bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            {cancelledBookings && cancelledBookings.length > 0 ? (
              <div className="space-y-4">
                {cancelledBookings.map((booking) =>
                  renderBookingCard(booking, false),
                )}
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No cancelled bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AccountLayout>
  );
}
