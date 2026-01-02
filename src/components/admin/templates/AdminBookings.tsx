import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminBookings, useUpdateBookingStatus } from "@/hooks/use-admin";
import { Search, Calendar, Download } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { Loading } from "@/components/common/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AdminBookingsTemplate() {
  const [page, _] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading } = useAdminBookings({
    page,
    per_page: 10,
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const { mutate: updateStatus } = useUpdateBookingStatus();

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    console.log("Booking ID:", bookingId);
    console.log("New Status:", newStatus);
    updateStatus({ id: bookingId, status: newStatus });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage all customer bookings</p>
        </div>

        {/* Filters */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by booking number, guest name, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="checked_in">Checked In</SelectItem>
                  <SelectItem value="checked_out">Checked Out</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>All Bookings ({data?.meta?.total || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : data?.data && data.data.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking #</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.booking_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {booking.guest_first_name}{" "}
                              {booking.guest_last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.guest_email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {format(
                                new Date(booking.check_in_date),
                                "MMM dd",
                              )}{" "}
                              -{" "}
                              {format(
                                new Date(booking.check_out_date),
                                "MMM dd",
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{booking.num_guests}</TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(booking.total_amount)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.payment_status === "paid"
                                ? "default"
                                : booking.payment_status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="capitalize"
                          >
                            {booking.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(value) =>
                              handleStatusChange(booking.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">
                                Confirmed
                              </SelectItem>
                              <SelectItem value="checked_in">
                                Checked In
                              </SelectItem>
                              <SelectItem value="checked_out">
                                Checked Out
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No bookings found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
