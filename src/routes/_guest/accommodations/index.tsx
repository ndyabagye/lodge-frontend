import { AccommodationListTemplate } from "@/components/accommodation/templates/AccommodationList";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const accommodationSearchSchema = z.object({
  check_in: z.string().optional(),
  check_out: z.string().optional(),
  guests: z.string().optional(),
  type: z.string().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
});

export const Route = createFileRoute("/_guest/accommodations/")({
  component: AccomodationsPage,
  validateSearch: accommodationSearchSchema,
});

function AccomodationsPage() {
  const searchParams = Route.useSearch();
  return <AccommodationListTemplate searchParams={searchParams} />;
}
