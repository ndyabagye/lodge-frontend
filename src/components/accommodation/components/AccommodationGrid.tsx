import { AccommodationCard } from "./AccommodationCard";
import type { Accommodation } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { generatePageNumbers } from "@/lib/pagination";

interface AccommodationGridProps {
  accommodations: Accommodation[];
  pagination?: {
    current_page: number;
    last_page: number;
    total: number;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function AccommodationGrid({
  accommodations,
  pagination,
  currentPage,
  onPageChange,
}: AccommodationGridProps) {
  if (accommodations.length === 0) {
    return (
      <Empty>
        <EmptyDescription>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No accommodations found</p>
          </div>
        </EmptyDescription>
      </Empty>
    );
  }

  const pageNumbers = generatePageNumbers(currentPage, pagination);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {accommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Pagination className="mt-8">
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {/* Page Numbers */}
              {pageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => onPageChange(page as number)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  className={
                    currentPage === pagination.last_page
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  aria-disabled={currentPage === pagination.last_page}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
