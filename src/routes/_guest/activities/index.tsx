import { ActivityListTemplate } from "@/components/activities/templates/ActivityList";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const activitySearchSchema = z.object({
  category: z.string().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/_guest/activities/")({
  component: ActivityPage,
  validateSearch: activitySearchSchema,
});

function ActivityPage() {
  return <ActivityListTemplate />;
}
