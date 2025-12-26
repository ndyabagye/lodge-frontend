import { AccountLayout } from "../components/AccountLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookings } from "@/hooks/use-bookings";
import { useAuthStore } from "@/stores/auth-store";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountDashboardTemplate() {
  const { user } = useAuthStore();
  const { data: bookingsData, isLoading } = useBookings({ per_page: 3 });

  const upcomingBookings = bookingsData?.data?.filter(
    (booking) =>
      booking.status === "confirmed" &&
      new Date(booking.check_in_date) >= new Date(),
  );

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-primary-foreground/90">
            Manage your bookings and explore new experiences
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {bookingsData?.meta?.total || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Stays
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {upcomingBookings?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Bookings</CardTitle>
            <Link to="/account/bookings">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-24 w-24 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingBookings && upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-24 h-24 rounded-lg bg-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">
                            Booking #{booking.booking_number}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.guest_first_name} {booking.guest_last_name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            {formatPrice(booking.total_amount)}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {booking.payment_status}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(booking.check_in_date), "MMM dd")}{" "}
                            -{" "}
                            {format(
                              new Date(booking.check_out_date),
                              "MMM dd, yyyy",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  No upcoming bookings
                </p>
                <Link to="/accommodations" search={{}}>
                  <Button>Browse Accommodations</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <Link to="/accommodations" search={{}}>
              <Button
                variant="outline"
                className="w-full h-auto py-4 justify-start"
              >
                <MapPin className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Book a Stay</div>
                  <div className="text-xs text-muted-foreground">
                    Find your next getaway
                  </div>
                </div>
              </Button>
            </Link>

            <Link to="/activities" search={{}}>
              <Button
                variant="outline"
                className="w-full h-auto py-4 justify-start"
              >
                <Clock className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Book Activities</div>
                  <div className="text-xs text-muted-foreground">
                    Explore experiences
                  </div>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}
