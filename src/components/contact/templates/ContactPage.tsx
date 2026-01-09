import { ContactUsForm } from "../components/ContactUsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactPageTemplate() {
  return (
    <div className="min-h-screen premium-bg-background py-12">
      <div className="premium-container ">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-premium-accent"></div>
            <span className="premium-tagline premium-text-accent">
              GET IN TOUCH
            </span>
            <div className="h-px w-12 bg-premium-accent"></div>
          </div>
          <h1 className="premium-heading text-4xl mb-4 premium-text-primary">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about bookings, hosting, or anything else? Our team
            is here to help.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                  Get in Touch
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  We're here to help you with any questions or concerns.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-premium-accent/10 p-2 rounded-full shrink-0">
                    <MapPin className="h-5 w-5 text-premium-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Our Location
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Plot 123, Kampala Road
                      <br />
                      Kampala, Uganda
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-premium-accent/10 p-2 rounded-full shrink-0">
                    <Phone className="h-5 w-5 text-premium-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Phone Number
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      +256 700 123 456
                      <br />
                      +256 312 123 456
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-premium-accent/10 p-2 rounded-full shrink-0">
                    <Mail className="h-5 w-5 text-premium-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Email Address
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      support@lodgebooking.com
                      <br />
                      bookings@lodgebooking.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-premium-accent/10 p-2 rounded-full shrink-0">
                    <Clock className="h-5 w-5 text-premium-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Business Hours
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 4:00 PM
                      <br />
                      Sunday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">
                    How do I cancel a booking?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can cancel bookings from your account dashboard.
                    Cancellation policies vary by property.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">
                    When will I receive my security deposit?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Security deposits are refunded within 7-14 business days
                    after check-out.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">
                    How do I become a host?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click "Become a Host" in the main menu to start the listing
                    process.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  );
}
