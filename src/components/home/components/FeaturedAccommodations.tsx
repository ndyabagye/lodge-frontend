import { Link } from "@tanstack/react-router";
import { useAccommodations } from "@/hooks/use-accommodations";
import { AccommodationCard } from "@/components/accommodation/components/AccommodationCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedAccommodations() {
  const { data, isLoading } = useAccommodations({
    featured: true,
    per_page: 6,
  });

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Accommodations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked selections of our most popular and luxurious stays
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="bg-muted-foreground/30 dark:bg-muted h-64 w-full" />
                <Skeleton className="bg-muted-foreground/30 dark:bg-muted h-4 w-3/4" />
                <Skeleton className="bg-muted-foreground/30 dark:bg-muted h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {data.data.slice(0, 6).map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                />
              ))}
            </div>

            <div className="text-center">
              <Link to="/accommodations" search={{}}>
                <Button size="lg" variant="outline">
                  View All Accommodations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No featured accommodations available yet
          </div>
        )}
      </div>
    </section>
  );
}
