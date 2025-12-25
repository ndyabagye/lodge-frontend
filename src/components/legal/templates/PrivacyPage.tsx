import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PrivacyPageTemplate() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="border-6 border-double border-muted shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>
              Last Updated: December {currentYear}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Name, email address, phone number, and other contact
                  information
                </li>
                <li>
                  Payment information (processed securely by our payment
                  partners)
                </li>
                <li>Communication preferences</li>
                <li>Booking history and preferences</li>
                <li>Property listing information (for hosts)</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and send booking confirmations</li>
                <li>
                  Communicate with you about bookings, updates, and promotions
                </li>
                <li>Personalize your experience and show relevant content</li>
                <li>Detect, prevent, and address technical issues or fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share
                information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Property hosts to facilitate bookings</li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Other users in reviews and ratings (anonymously)</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security
                measures to protect your personal information. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                To exercise these rights, contact us at privacy@lodgebooking.com
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                6. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your
                experience, analyze usage, and deliver personalized content. You
                can control cookies through your browser settings.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                Our Service is not intended for individuals under 18 years of
                age. We do not knowingly collect personal information from
                children. If you believe we have collected information from a
                child, please contact us.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Changes to Privacy Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this policy periodically. We will notify you of
                any changes by posting the new policy on this page and updating
                the "Last Updated" date.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact
                us:
                <br />
                Email: privacy@lodgebooking.com
                <br />
                Address: Data Protection Officer, Kampala, Uganda
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
