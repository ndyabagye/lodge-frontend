import { ActivityCard } from "./ActivityCard";
import type { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ActivityGridProps {
  activities: Activity[];
  pagination?: {
    current_page: number;
    last_page: number;
    total: number;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function ActivityGrid({
  activities,
  pagination,
  currentPage,
  onPageChange,
}: ActivityGridProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No activities found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="min-w-10"
                >
                  {page}
                </Button>
              ),
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pagination.last_page}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
