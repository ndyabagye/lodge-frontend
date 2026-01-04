import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock data - will be replaced with actual API call
const activities = [
  {
    id: "1",
    name: "Guided Nature Walk",
    slug: "guided-nature-walk",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    duration: 120,
    price: 50000,
    category: "Adventure",
  },
  {
    id: "2",
    name: "Boat Safari",
    slug: "boat-safari",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    duration: 180,
    price: 80000,
    category: "Adventure",
  },
  {
    id: "3",
    name: "Spa & Wellness",
    slug: "spa-wellness",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    duration: 90,
    price: 120000,
    category: "Relaxation",
  },
];

export function FeaturedActivities() {
  return (
    <section className="premium-section premium-bg-background">
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

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="premium-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-white text-gray-900 shadow-md">
                  {activity.category}
                </Badge>
              </div>
              <CardContent className="space-y-4 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-premium-accent transition-colors">
                  {activity.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{activity.duration} mins</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(activity.price)}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link
                  to="/activities/$slug"
                  params={{ slug: activity.slug }}
                  className="w-full"
                >
                  <Button
                    className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-premium-accent hover:text-premium-accent bg-white dark:bg-gray-800 font-semibold"
                    variant="outline"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

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
