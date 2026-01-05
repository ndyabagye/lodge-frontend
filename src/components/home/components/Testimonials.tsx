import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Kampala, Uganda",
    rating: 5,
    comment:
      "Absolutely amazing experience! The accommodation was pristine and the staff were incredibly welcoming. Will definitely be coming back.",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Nairobi, Kenya",
    rating: 5,
    comment:
      "Perfect weekend getaway. The location is stunning and the amenities exceeded our expectations. Couldn't have asked for more!",
    initials: "MC",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "Dar es Salaam, Tanzania",
    rating: 5,
    comment:
      "A hidden gem! The attention to detail and the personalized service made our stay truly memorable. Highly recommended.",
    initials: "EW",
  },
];

export function Testimonials() {
  return (
    <section className="premium-section-sm bg-gray-50 dark:bg-gray-900/50">
      <div className="premium-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-premium-accent"></div>
            <span className="premium-tagline premium-text-accent">
              TESTIMONIALS
            </span>
            <div className="h-px w-12 bg-premium-accent"></div>
          </div>
          <h2 className="premium-heading text-3xl lg:text-4xl mb-4 premium-text-primary">
            What Our{" "}
            <span className="premium-heading-serif premium-text-accent">
              Guests Say
            </span>
          </h2>
          <p className="premium-subtitle premium-text-muted max-w-2xl mx-auto">
            Real experiences from real guests
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="premium-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:border-premium-accent"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-premium-accent text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
