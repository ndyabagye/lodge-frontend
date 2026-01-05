import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TermsPageTemplate() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="border-6 border-double border-muted shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Terms of Service
            </CardTitle>
            <CardDescription>
              Last Updated: December {currentYear}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using Lodge Booking Platform ("the Service"),
                you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to these terms, please do
                not use our Service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Description of Service
              </h2>
              <p className="text-muted-foreground">
                Lodge Booking Platform provides an online marketplace that
                connects property owners with guests seeking accommodations. We
                facilitate booking transactions but are not a party to any
                rental agreement between hosts and guests.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. User Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You must be at least 18 years old to use our Service</li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account
                </li>
                <li>You agree to provide accurate and complete information</li>
                <li>
                  You will not use the Service for any illegal or unauthorized
                  purpose
                </li>
                <li>
                  You will not interfere with or disrupt the Service or servers
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Booking and Payments
              </h2>
              <p className="text-muted-foreground">
                All bookings are subject to availability and confirmation.
                Prices are displayed in ZMW (Zambian Kwacha) and include all
                applicable taxes unless stated otherwise. We use secure payment
                gateways for all transactions.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Cancellation Policy
              </h2>
              <p className="text-muted-foreground">
                Cancellation policies vary by property and are set by individual
                hosts. Please review the specific cancellation policy for each
                property before booking. Refunds are processed according to the
                property's cancellation policy.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                6. Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                Lodge Booking Platform shall not be liable for any direct,
                indirect, incidental, special, or consequential damages
                resulting from the use or inability to use the Service or for
                the cost of procurement of substitute services.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Changes to Terms
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will
                notify users of any changes by posting the new terms on this
                page. Continued use of the Service after changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Contact Information
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us
                at:
                <br />
                Email: legal@lodgebooking.com
                <br />
                Address: Kampala, Uganda
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
