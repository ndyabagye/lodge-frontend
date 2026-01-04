// import { Link } from "@tanstack/react-router";
// import { useAccommodations } from "@/hooks/use-accommodations";
// import { AccommodationCard } from "@/components/accommodation/components/AccommodationCard";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// export function FeaturedAccommodations() {
//   const { data, isLoading } = useAccommodations({
//     featured: true,
//     per_page: 6,
//   });

//   return (
//     <section className="py-16 lg:py-24 bg-background">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-bold mb-4">
//             Featured Accommodations
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             Handpicked selections of our most popular and luxurious stays
//           </p>
//         </div>

//         {isLoading ? (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div key={i} className="space-y-3">
//                 <Skeleton className="bg-muted-foreground/30 dark:bg-muted h-64 w-full" />
//                 <Skeleton className="bg-muted-foreground/30 dark:bg-muted h-4 w-3/4" />
//                 <Skeleton className="bg-muted-foreground/30 dark:bg-muted h-4 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : data?.data && data.data.length > 0 ? (
//           <>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//               {data.data.slice(0, 6).map((accommodation) => (
//                 <AccommodationCard
//                   key={accommodation.id}
//                   accommodation={accommodation}
//                 />
//               ))}
//             </div>

//             <div className="text-center">
//               <Link to="/accommodations" search={{}}>
//                 <Button size="lg" variant="outline">
//                   View All Accommodations
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//             </div>
//           </>
//         ) : (
//           <div className="text-center text-muted-foreground py-12">
//             No featured accommodations available yet
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// components/home/FeaturedAccommodations.tsx (Premium Version)
import { Link } from "@tanstack/react-router";
import { useAccommodations } from "@/hooks/use-accommodations";
import { AccommodationCard } from "@/components/accommodation/components/AccommodationCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedAccommodations() {
  const { data, isLoading } = useAccommodations({
    featured: true,
    per_page: 6,
  });

  return (
    <section className="premium-section premium-bg-background">
      <div className="premium-container">
        {/* Section Header with Premium Styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-premium-accent" />
              <span className="premium-tagline">Curated Selection</span>
              <div className="w-12 h-px bg-premium-accent" />
            </div>

            <h2 className="premium-heading text-4xl lg:text-5xl mb-4 premium-text-primary">
              <span className="premium-heading-serif">Signature</span> Retreats
            </h2>

            <p className="premium-subtitle max-w-2xl">
              Experience our handpicked collection of exceptional
              accommodations, each offering unique luxury in breathtaking
              settings.
            </p>
          </div>

          <Link to="/accommodations" search={{}}>
            <Button
              variant="outline"
              size="lg"
              className="premium-button-outline group"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square bg-premium-muted/50 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4 bg-premium-muted/50 rounded" />
                  <Skeleton className="h-4 w-1/2 bg-premium-muted/50 rounded" />
                  <Skeleton className="h-4 w-full bg-premium-muted/50 rounded" />
                  <Skeleton className="h-4 w-2/3 bg-premium-muted/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            {/* Accommodations Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {data.data.slice(0, 6).map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                />
              ))}
            </div>

            {/* Premium Verification Badge */}
            <div className="pt-8 border-t premium-border-light">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-premium-accent/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-premium-accent" />
                </div>
                <span className="text-sm font-medium premium-text-muted">
                  All accommodations are personally verified for quality
                </span>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-premium-muted/50 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 premium-text-muted" />
            </div>
            <p className="premium-text-muted mb-4">
              No featured accommodations available
            </p>
            <Link to="/accommodations" search={{}}>
              <Button variant="outline" className="premium-button-outline">
                Browse All Retreats
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
