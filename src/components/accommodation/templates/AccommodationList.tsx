import { useEffect, useState } from "react";
import { useAccommodations } from "@/hooks/use-accommodations";
import { AccommodationGrid } from "../components/AccommodationGrid";
import { AccommodationFilters } from "../components/AccommodationFilters";
import { Loading } from "@/components/common/Loading";
import type { AccommodationFilters as Filters } from "@/types";
import { formatDate } from "@/lib/utils";

interface AccommodationListTemplateProps {
  searchParams?: {
    check_in?: string;
    check_out?: string;
    guests?: string;
  };
}

export function AccommodationListTemplate({
  searchParams,
}: AccommodationListTemplateProps) {
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);

  // Apply search params from homepage
  useEffect(() => {
    if (searchParams) {
      setFilters((prev) => ({
        ...prev,
        ...(searchParams.guests && { min_guests: Number(searchParams.guests) }),
      }));
    }
  }, [searchParams]);

  const { data, isLoading, error } = useAccommodations({ ...filters, page });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          Error loading accommodations. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Accommodations</h1>
        <p className="text-muted-foreground">
          Find your perfect stay from our collection of unique accommodations
        </p>
        {searchParams?.check_in && searchParams?.check_out && (
          <p className="text-sm text-muted-foreground mt-2">
            Showing results for {formatDate(searchParams.check_in)} -{" "}
            {formatDate(searchParams.check_out)}
            {searchParams.guests && ` · ${searchParams.guests} guests`}
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <AccommodationFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Accommodation Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <Loading />
          ) : (
            <AccommodationGrid
              accommodations={data?.data || []}
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
