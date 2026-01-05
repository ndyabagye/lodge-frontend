import { useAccommodations } from "@/hooks/use-accommodations";
import { AccommodationCard } from "./AccommodationCard";
import { Loading } from "@/components/common/Loading";

interface RelatedAccommodationsProps {
  currentId: string;
  type: string;
}

export function RelatedAccommodations({
  currentId,
  type,
}: RelatedAccommodationsProps) {
  const { data, isLoading } = useAccommodations({ type, per_page: 3 });

  if (isLoading) return <Loading />;

  const related = data?.data.filter((acc) => acc.id !== currentId).slice(0, 3);

  if (!related || related.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-12 bg-premium-accent"></div>
          <span className="premium-tagline premium-text-accent">
            DISCOVER MORE
          </span>
          <div className="h-px w-12 bg-premium-accent"></div>
        </div>
        <h2 className="premium-heading text-3xl mb-4 premium-text-primary">
          Similar{" "}
          <span className="premium-heading-serif premium-text-accent">
            Accommodations
          </span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
          />
        ))}
      </div>
    </div>
  );
}
