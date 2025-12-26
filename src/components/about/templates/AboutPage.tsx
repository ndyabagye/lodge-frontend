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
    <div className="min-h-screen bg-linear-to-b from-background to-muted/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-background py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Award className="h-3 w-3 mr-2" />
              Uganda's Leading Lodge Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Connecting Travelers with
              <span className="text-primary block">Authentic Stays</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to transform travel in East Africa by making it
              easy to discover and book unique, locally-owned accommodations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/accommodations" search={{}}>
                  Explore Accomodations
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-none shadow-none bg-transparent"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
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
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">Based in Kampala, Uganda</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Serving since 2021</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg italic text-muted-foreground mb-4">
                    "To empower local hospitality businesses and connect
                    travelers with authentic East African experiences."
                  </p>
                  <Separator className="my-4" />
                  <CardTitle className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5" />
                    Our Vision
                  </CardTitle>
                  <p className="text-muted-foreground">
                    We envision a future where every quality accommodation in
                    East Africa has equal opportunity to succeed, and every
                    traveler can easily find their perfect local stay.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              These principles guide everything we do, from selecting properties
              to designing our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group border border-border/50 bg-background/60 backdrop-blur-sm transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform
"
                    >
                      {value.icon}
                    </div>
                    <h3 className="font-semibold text-lg leading-tight">
                      {value.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              Passionate individuals dedicated to transforming travel in East
              Africa
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">
              From humble beginnings to East Africa's preferred lodge booking
              platform
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block"></div>
            <div className="space-y-12 md:space-y-0">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:w-1/2 md:px-8">
                    <Card
                      className={`border-2 ${index % 2 === 0 ? "md:text-right" : ""}`}
                    >
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="font-bold text-lg mb-2">
                          {milestone.event}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block"></div>
                  <div className="md:w-1/2 md:px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 bg-linear-to-r from-primary/5 to-primary/10 text-center">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Experience East Africa?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who have discovered authentic stays
                through our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/accommodations" search={{}}>
                    <Calendar className="h-4 w-4" />
                    Book Your Stay
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link to="/contact">
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+256 700 123 456</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
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
