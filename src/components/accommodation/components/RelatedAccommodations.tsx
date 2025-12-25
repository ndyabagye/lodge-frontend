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
    <div>
      <h2 className="text-2xl font-bold mb-6">Similar Accommodations</h2>
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
