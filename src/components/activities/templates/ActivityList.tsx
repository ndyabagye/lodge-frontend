import { useState } from "react";
import { useActivities } from "@/hooks/use-activities";
import { Loading } from "@/components/common/Loading";
import type { ActivityFilters as Filters } from "@/types/activity";
import { ActivityFilters } from "../components/ActivityFilters";
import { ActivityGrid } from "../components/ActivityGrid";

export function ActivityListTemplate() {
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useActivities({ ...filters, page });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          Error loading activities. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Activities & Experiences</h1>
        <p className="text-muted-foreground">
          Discover exciting activities to enhance your stay
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ActivityFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Activity Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <Loading />
          ) : (
            <ActivityGrid
              activities={data?.data || []}
              pagination={data?.meta}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
