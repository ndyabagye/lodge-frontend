import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivities } from "@/hooks/use-activities";
import { ActivityCard } from "@/components/activities/components/ActivityCard";

export function FeaturedActivities() {
  const { data, isLoading } = useActivities({
    featured: true,
    per_page: 6,
  });
  console.log("The data:", data);
  return (
    <section className="premium-section-sm premium-bg-background">
      <div className="premium-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-premium-accent"></div>
            <span className="premium-tagline premium-text-accent">
              EXPERIENCES
            </span>
            <div className="h-px w-12 bg-premium-accent"></div>
          </div>
          <h2 className="premium-heading text-3xl lg:text-4xl mb-4 premium-text-primary">
            Popular{" "}
            <span className="premium-heading-serif premium-text-accent">
              Activities
            </span>
          </h2>
          <p className="premium-subtitle premium-text-muted max-w-2xl mx-auto">
            Enhance your stay with exciting activities and experiences
          </p>
        </div>

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
            {/* Activities Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {data.data.slice(0, 6).map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
            {/* Premium Verification Badge */}
            <div className="pt-8 border-t premium-border-light">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-premium-accent/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-premium-accent" />
                </div>
                <span className="text-sm font-medium premium-text-muted">
                  All activities are guided by certified professionals
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
              No featured activities available
            </p>
            <Link to="/activities" search={{}}>
              <Button variant="outline" className="premium-button-outline">
                Browse All Activities
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link to="/activities" search={{}}>
            <Button
              size="lg"
              className="bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
            >
              View All Activities
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
