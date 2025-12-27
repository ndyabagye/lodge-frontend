import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  HelpCircle,
  MessageSquare,
  FileText,
  Home,
  User,
  Shield,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function FAQPageTemplate() {
  const faqCategories = [
    {
      id: "booking",
      title: "Booking & Reservations",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          question: "How do I make a booking?",
          answer:
            "To make a booking, simply search for your desired location and dates, browse available properties, select your preferred accommodation, and follow the booking process. You'll need to provide your details and payment information to confirm the reservation.",
        },
        {
          question: "Can I modify or cancel my booking?",
          answer:
            "Yes, you can modify or cancel your booking from your account dashboard. Go to 'My Bookings', select the reservation you want to change, and choose the modification or cancellation option. Please note that cancellation policies vary by property and may affect refund eligibility.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including credit/debit cards (Visa, MasterCard), mobile money (MTN, Airtel), and bank transfers. All payments are processed securely through our encrypted payment gateway.",
        },
        {
          question: "When will I receive my booking confirmation?",
          answer:
            "Booking confirmations are sent instantly via email once payment is successfully processed. You'll receive a confirmation email with your booking details, property information, and check-in instructions.",
        },
        {
          question: "Is there a booking fee?",
          answer:
            "We charge a small service fee that helps us maintain our platform, provide customer support, and ensure secure transactions. This fee is clearly displayed before you complete your booking.",
        },
      ],
    },
    {
      id: "hosting",
      title: "Hosting & Property Owners",
      icon: <Home className="h-5 w-5" />,
      questions: [
        {
          question: "How do I list my property?",
          answer:
            "Click 'Become a Host' in the main menu, create a host account, and complete the property listing form. You'll need to provide property details, photos, pricing, and availability. Our team will review your listing within 24-48 hours.",
        },
        {
          question: "What are the requirements to become a host?",
          answer:
            "You must own or have legal authority to rent the property, provide valid identification, maintain high cleanliness standards, and be responsive to guest inquiries. All properties must meet our safety and quality standards.",
        },
        {
          question: "How do I get paid as a host?",
          answer:
            "Payments are processed after guest check-in. We transfer earnings to your registered bank account or mobile money within 24 hours of guest check-out, minus our service fee.",
        },
        {
          question: "Can I set my own house rules?",
          answer:
            "Yes, you can set custom house rules including check-in/check-out times, smoking policies, pet allowances, and guest requirements. These rules must be clearly stated in your listing.",
        },
        {
          question: "What support do you provide to hosts?",
          answer:
            "We offer 24/7 support, professional photography services, pricing optimization tools, marketing assistance, and legal guidance to help you succeed as a host.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Profile",
      icon: <User className="h-5 w-5" />,
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Click 'Sign Up' in the top right corner, enter your email address, create a password, and complete your profile information. You can also sign up using your Google or Facebook account for faster registration.",
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer:
            "Click 'Forgot Password' on the login page, enter your registered email address, and follow the instructions in the reset email you receive. Reset links are valid for 24 hours.",
        },
        {
          question: "How do I update my profile information?",
          answer:
            "Log into your account, go to 'My Profile' in the account menu, and click 'Edit Profile'. You can update your personal information, contact details, and preferences at any time.",
        },
        {
          question: "Can I have multiple users on one account?",
          answer:
            "For security reasons, each account should be used by one individual. Family or group bookings should be made by the person who will be responsible for the reservation.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Contact our support team to request account deletion. Please note that you must resolve any active bookings or pending payments before your account can be deleted.",
        },
      ],
    },
    {
      id: "safety",
      title: "Safety & Security",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "How do you verify properties?",
          answer:
            "All properties undergo a rigorous verification process including document verification, physical inspections (where possible), and review of amenities and safety features. We also monitor guest reviews and ratings continuously.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard SSL encryption and PCI-compliant payment processors to protect your financial information. We never store your full credit card details on our servers.",
        },
        {
          question: "What safety measures are in place for guests?",
          answer:
            "We require properties to have smoke detectors, fire extinguishers, first aid kits, and secure locks. We also offer 24/7 emergency support and verify that properties comply with local safety regulations.",
        },
        {
          question: "What happens if there's an issue with my booking?",
          answer:
            "Contact our support team immediately. We offer a Book with Confidence guarantee that provides assistance with significant issues like property not as described, last-minute cancellations, or safety concerns.",
        },
        {
          question: "How are guest reviews moderated?",
          answer:
            "All reviews are monitored for authenticity and compliance with our community guidelines. We remove reviews that contain inappropriate content, personal information, or are proven to be fraudulent.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "The website/app isn't loading properly. What should I do?",
          answer:
            "Try clearing your browser cache and cookies, or try using a different browser. If the issue persists, check our status page for any ongoing maintenance or contact our technical support team.",
        },
        {
          question: "How do I update the app?",
          answer:
            "Visit your device's app store (Google Play Store or Apple App Store) and check for updates to the Lodge Booking Platform app. Enable automatic updates to always have the latest version.",
        },
        {
          question: "I'm not receiving confirmation emails. What should I do?",
          answer:
            "First, check your spam or junk folder. If the email isn't there, verify that you entered the correct email address. You can also resend confirmation emails from your account dashboard.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach our support team via email at support@lodgebooking.com, phone at +256 700 123 456, or through the live chat feature on our website (available 24/7).",
        },
        {
          question: "Do you have a mobile app?",
          answer:
            "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the Apple App Store or Google Play Store.",
        },
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(faqCategories);

  // Filter FAQs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCategories(faqCategories);
      return;
    }

    const filtered = faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((category) => category.questions.length > 0);

    setFilteredCategories(filtered);
  }, [searchQuery]);

  // Handle badge clicks for quick searches
  const handleBadgeClick = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-background to-background py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about bookings, hosting, account
              management, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="pl-12 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleBadgeClick("booking process")}
                >
                  Booking Process
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleBadgeClick("payment")}
                >
                  Payment Issues
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleBadgeClick("cancellation")}
                >
                  Cancellation Policy
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleBadgeClick("host")}
                >
                  Host Registration
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleBadgeClick("security")}
                >
                  Account Security
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      document
                        .getElementById(category.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {category.icon}
                    {category.title}
                  </Button>
                ))}
                <Separator className="my-4" />
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Still need help?</h3>
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link to="/contact">
                      <MessageSquare className="h-4 w-4" />
                      Contact Us
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link to="/terms">
                      <FileText className="h-4 w-4" />
                      Terms of Service
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link to="/privacy">
                      <Shield className="h-4 w-4" />
                      Privacy Policy
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3 space-y-12">
            {filteredCategories.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any FAQ items matching "{searchQuery}".
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} id={category.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <Card key={index} className="overflow-hidden">
                        <AccordionItem
                          value={`${category.id}-${index}`}
                          className="border-0"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                            <span className="text-left font-semibold">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 pt-0">
                            <div className="pt-2 text-muted-foreground">
                              {faq.answer}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Card>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-muted/30 py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visit our help center for more detailed guides and tutorials, or
            browse our community forum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link to="/about">
                <HelpCircle className="h-4 w-4" />
                About Us
              </Link>
            </Button>
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                <MessageSquare className="h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
