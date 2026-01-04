// import { Shield, Star, MapPin, Headphones } from "lucide-react";

// const features = [
//   {
//     icon: Star,
//     title: "Premium Quality",
//     description:
//       "Handpicked accommodations that meet our high standards of comfort and luxury",
//   },
//   {
//     icon: MapPin,
//     title: "Best Locations",
//     description:
//       "Situated in the most scenic and accessible locations for your convenience",
//   },
//   {
//     icon: Shield,
//     title: "Secure Booking",
//     description: "Safe and secure payment processing with instant confirmation",
//   },
//   {
//     icon: Headphones,
//     title: "24/7 Support",
//     description:
//       "Round-the-clock customer support to assist you with any queries",
//   },
// ];

// export function WhyChooseUs() {
//   return (
//     <section className="py-16 lg:py-24 bg-muted/50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Us</h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             We're committed to providing you with an unforgettable experience
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="text-center group hover:scale-105 transition-transform duration-300"
//             >
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                 <feature.icon className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-muted-foreground">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// components/home/WhyChooseUs.tsx (Premium Version)
import { Shield, Star, MapPin, Headphones, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Curated Excellence",
    description:
      "Each property undergoes rigorous selection to ensure exceptional quality and unique character.",
    accentColor: "text-premium-accent",
  },
  {
    icon: MapPin,
    title: "Pristine Locations",
    description:
      "Carefully situated in nature's most breathtaking settings for complete immersion and privacy.",
    accentColor: "text-premium-accent",
  },
  {
    icon: Shield,
    title: "Secure & Seamless",
    description:
      "End-to-end secure booking with instant confirmation and flexible options.",
    accentColor: "text-premium-accent",
  },
  {
    icon: Headphones,
    title: "Concierge Service",
    description:
      "Personalized 24/7 support to craft your perfect experience from start to finish.",
    accentColor: "text-premium-accent",
  },
];

export function WhyChooseUs() {
  return (
    <section className="premium-section premium-bg-muted">
      <div className="premium-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-premium-accent" />
            <span className="premium-tagline">Our Commitment</span>
            <div className="w-8 h-px bg-premium-accent" />
          </div>

          <h2 className="premium-heading text-4xl lg:text-5xl mb-6 premium-text-primary">
            The <span className="premium-heading-serif">Sanctuary</span> Promise
          </h2>

          <p className="premium-subtitle max-w-2xl mx-auto">
            We believe in creating experiences that transcend ordinary
            hospitality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 premium-card hover:premium-card-hover transition-all duration-300"
            >
              {/* Decorative Corner */}
              <div className="absolute top-6 right-6 w-2 h-2 bg-premium-accent/20 rounded-full group-hover:bg-premium-accent/40 transition-colors" />

              {/* Icon Container */}
              <div className="w-12 h-12 mb-6 rounded-xl bg-premium-accent/10 flex items-center justify-center group-hover:bg-premium-accent/20 transition-colors">
                <feature.icon className="h-6 w-6 premium-text-accent" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 premium-text-primary group-hover:premium-text-accent transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="premium-text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-premium-accent/0 via-premium-accent/0 to-premium-accent/0 group-hover:from-premium-accent/50 group-hover:via-premium-accent group-hover:to-premium-accent/50 transition-all duration-300 rounded-b-lg" />
            </div>
          ))}
        </div>

        {/* Additional Assurance Section */}
        <div className="mt-20 pt-8 border-t premium-border-light">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-premium-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 premium-text-accent" />
              </div>
              <p className="text-sm font-medium premium-text-primary mb-2">
                Best Price Guarantee
              </p>
              <p className="text-xs premium-text-muted">
                Find a better price? We'll match it.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-premium-accent/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 premium-text-accent" />
              </div>
              <p className="text-sm font-medium premium-text-primary mb-2">
                Secure Booking
              </p>
              <p className="text-xs premium-text-muted">
                Your data is protected with bank-level security.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-premium-accent/10 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-6 w-6 premium-text-accent" />
              </div>
              <p className="text-sm font-medium premium-text-primary mb-2">
                24/7 Support
              </p>
              <p className="text-xs premium-text-muted">
                Always here to help with any questions.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Quote */}
        <div className="mt-16 pt-12 border-t premium-border-light">
          <div className="max-w-3xl mx-auto text-center">
            <p className="premium-heading-serif text-2xl premium-text-primary mb-4">
              "Where luxury meets wilderness, and every moment is a memory in
              the making."
            </p>
            <p className="text-sm premium-text-muted">
              — The Sanctuary Promise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
