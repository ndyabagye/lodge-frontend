import { CallToAction } from "../components/CallToAction";
import { FeaturedAccommodations } from "../components/FeaturedAccommodations";
import { FeaturedActivities } from "../components/FeaturedActivities";
import { HeroSection } from "../components/HeroSection";
import { Testimonials } from "../components/Testimonials";
import { WhyChooseUs } from "../components/WhyChooseUs";

export function HomePageTemplate() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedAccommodations />
      <WhyChooseUs />
      <FeaturedActivities />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
