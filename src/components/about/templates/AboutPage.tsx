import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import {
  Building,
  Users,
  Shield,
  Star,
  MapPin,
  Globe,
  Heart,
  Target,
  Award,
  Clock,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

export function AboutPageTemplate() {
  const teamMembers = [
    {
      name: "David Kato",
      role: "Founder & CEO",
      bio: "Hospitality industry veteran with 15+ years experience",
      initials: "DK",
      image: "/team/david.jpg",
    },
    {
      name: "Sarah Nalwoga",
      role: "Head of Operations",
      bio: "Former hotel manager passionate about guest experiences",
      initials: "SN",
      image: "/team/sarah.jpg",
    },
    {
      name: "Michael Ochieng",
      role: "Tech Lead",
      bio: "Software engineer focused on seamless booking experiences",
      initials: "MO",
      image: "/team/michael.jpg",
    },
    {
      name: "Grace Mwangi",
      role: "Community Manager",
      bio: "Connecting hosts with travelers across East Africa",
      initials: "GM",
      image: "/team/grace.jpg",
    },
  ];

  const milestones = [
    {
      year: "2021",
      event: "Founded in Kampala, Uganda",
      description: "Started with 10 local lodges",
    },
    {
      year: "2022",
      event: "Expanded to 100+ properties",
      description: "Launched across Uganda",
    },
    {
      year: "2023",
      event: "10,000+ bookings processed",
      description: "Awarded Best Travel Platform",
    },
    {
      year: "2024",
      event: "Regional expansion",
      description: "Launched in Kenya and Tanzania",
    },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Authenticity",
      description: "Showcasing genuine local experiences and properties",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Trust",
      description: "Verified properties and secure transactions",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community",
      description: "Supporting local hosts and sustainable tourism",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Excellence",
      description: "Curating only the best accommodations",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Verified Properties",
      icon: <Building className="h-5 w-5" />,
    },
    {
      value: "25,000+",
      label: "Happy Travelers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      value: "4.8★",
      label: "Average Rating",
      icon: <Star className="h-5 w-5" />,
    },
    { value: "3+", label: "Countries", icon: <Globe className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen premium-bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 min-h-125 flex items-center">
        {/*<section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-background py-20 px-4">*/}

        <div className="absolute inset-0">
          <img
            src="/images/lodges-overview.jpeg"
            alt="Lodge overview"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/50" />
        </div>

        <div className="premium-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm border-white/30 text-white font-semibold">
              <Award className="h-3 w-3 mr-2" />
              Zambia's Leading Lodge Platform
            </Badge>
            <h1 className="premium-heading text-5xl md:text-6xl mb-6 text-white">
              Connecting Travelers with
              <span className="premium-heading-serif premium-text-accent block mt-2">
                Authentic Stays
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're on a mission to transform travel in East Africa by making it
              easy to discover and book unique, locally-owned accommodations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all font-semibold"
                asChild
              >
                <Link to="/accommodations" search={{}}>
                  Explore Accommodations
                </Link>
              </Button>
              <Button
                size="lg"
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-semibold transition-all"
                asChild
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="premium-section-sm bg-gray-50 dark:bg-gray-900/50">
        <div className="premium-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-none shadow-none bg-transparent"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2 text-premium-accent">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Images */}
      <section className="premium-section">
        <div className="premium-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-12 bg-premium-accent"></div>
                <span className="premium-tagline premium-text-accent">
                  OUR STORY
                </span>
                <div className="h-px w-12 bg-premium-accent"></div>
              </div>
              <h2 className="premium-heading text-3xl mb-6 premium-text-primary">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded in 2021 in Kampala, Uganda, Lodge Booking Platform was
                  born from a simple observation: travelers were missing out on
                  incredible local accommodations because they couldn't find
                  them online.
                </p>
                <p>
                  Our founder, David Kato, noticed that many amazing lodges,
                  guest houses, and boutique hotels in East Africa lacked the
                  digital presence needed to reach travelers. Meanwhile,
                  travelers were limited to international chains and mainstream
                  options.
                </p>
                <p>
                  We set out to bridge this gap—creating a platform that
                  empowers local property owners while giving travelers access
                  to authentic, memorable stays that money can't buy on other
                  platforms.
                </p>
              </div>

              {/* Image Grid - Using lady making bed and entrance */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/images/lady-making-bed.jpeg"
                    alt="Service excellence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/images/lodge-entrance.jpeg"
                    alt="Lodge entrance"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-premium-accent" />
                  <span className="font-medium">Based in Lusaka, Zambia</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-6 bg-gray-300 dark:bg-gray-600"
                />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-premium-accent" />
                  <span className="font-medium">Serving since 2021</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="premium-card bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <Building className="h-5 w-5 text-premium-accent" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    "To empower local hospitality businesses and connect
                    travelers with authentic East African experiences."
                  </p>
                  <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
                  <CardTitle className="flex items-center gap-2 mb-4 text-gray-900 dark:text-gray-100">
                    <Target className="h-5 w-5 text-premium-accent" />
                    Our Vision
                  </CardTitle>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We envision a future where every quality accommodation in
                    South Africa has equal opportunity to succeed, and every
                    traveler can easily find their perfect local stay.
                  </p>
                </CardContent>
              </Card>

              {/* Image - Conference room or dining */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/dining-area.jpeg"
                  alt="Dining experience"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Images */}
      <section className="premium-section bg-gray-50 dark:bg-gray-900/50">
        <div className="premium-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-premium-accent"></div>
              <span className="premium-tagline premium-text-accent">
                OUR VALUES
              </span>
              <div className="h-px w-12 bg-premium-accent"></div>
            </div>
            <h2 className="premium-heading text-3xl mb-4 premium-text-primary">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              These principles guide everything we do, from selecting properties
              to designing our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="premium-card group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:border-premium-accent"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-premium-accent/10 text-premium-accent group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold text-lg leading-tight text-gray-900 dark:text-gray-100">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Images Row - Kitchen, bar, car park */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/kitchen-lady.jpeg"
                alt="Kitchen facilities"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/bar-area.jpeg"
                alt="Bar and lounge"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/car-park.jpeg"
                alt="Parking facilities"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="premium-section">
        <div className="premium-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-premium-accent"></div>
              <span className="premium-tagline premium-text-accent">
                OUR TEAM
              </span>
              <div className="h-px w-12 bg-premium-accent"></div>
            </div>
            <h2 className="premium-heading text-3xl mb-4 premium-text-primary">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Passionate individuals dedicated to transforming travel in East
              Africa
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="premium-card text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-gray-100 dark:border-gray-700">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg bg-premium-accent text-white font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">
                    {member.name}
                  </h3>
                  <Badge className="mb-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-0">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="premium-section bg-gray-50 dark:bg-gray-900/50">
        <div className="premium-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-premium-accent"></div>
              <span className="premium-tagline premium-text-accent">
                OUR JOURNEY
              </span>
              <div className="h-px w-12 bg-premium-accent"></div>
            </div>
            <h2 className="premium-heading text-3xl mb-4 premium-text-primary">
              Our Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              From humble beginnings to East Africa's preferred lodge booking
              platform
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-premium-accent/30 hidden md:block"></div>
            <div className="space-y-12 md:space-y-0">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:w-1/2 md:px-8 mb-12 md:mb-16">
                    <Card
                      className={`premium-card bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow ${index % 2 === 0 ? "md:text-right" : ""}`}
                    >
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-premium-accent mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
                          {milestone.event}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-premium-accent border-4 border-white dark:border-gray-900 z-10 hidden md:block shadow-lg"></div>
                  <div className="md:w-1/2 md:px-8"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest bedroom image */}
          <div className="mt-12 max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/images/guest-bedroom.jpeg"
              alt="Comfortable guest bedroom"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="premium-section">
        <div className="premium-container">
          <Card className="premium-card bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 text-center shadow-2xl">
            <CardContent className="pt-12 pb-12">
              <h2 className="premium-heading text-3xl mb-4 premium-text-primary">
                Ready to Experience{" "}
                <span className="premium-heading-serif premium-text-accent">
                  East Africa?
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of travelers who have discovered authentic stays
                through our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gap-2 bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all font-semibold"
                  asChild
                >
                  <Link to="/accommodations" search={{}}>
                    <Calendar className="h-4 w-4" />
                    Book Your Stay
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-premium-accent hover:text-premium-accent hover:bg-premium-accent/10 bg-white dark:bg-gray-800 font-semibold"
                  asChild
                >
                  <Link to="/contact">
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-premium-accent" />
                  <span>+256 700 123 456</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-premium-accent" />
                  <span>hello@lodgebooking.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
