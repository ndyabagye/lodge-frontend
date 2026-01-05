import { BookingsTemplate } from "@/components/account/templates/Bookings";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/account/bookings")({
  component: BookingsPage,
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw redirect({ to: "/auth/login" });
    }
  },
});

function BookingsPage() {
  return <BookingsTemplate />;
}

// function BookingsPage() {
//   const { data, isLoading } = useBookings();

//   if (isLoading) return <Loading />;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

//       {data?.data && data.data.length > 0 ? (
//         <div className="grid gap-4">
//           {data.data.map((booking) => (
//             <Card key={booking.id} className="p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     Booking #{booking.booking_number}
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     {booking.check_in_date} - {booking.check_out_date}
//                   </p>
//                   <p className="text-sm mt-2">
//                     Status:{" "}
//                     <span className="font-medium">{booking.status}</span>
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-lg">
//                     ZMW {booking.total_amount.toLocaleString()}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     {booking.payment_status}
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <Empty className="p-12 text-center">
//           <p className="text-muted-foreground">No bookings yet</p>
//         </Empty>
//       )}
//     </div>
//   );
// }
