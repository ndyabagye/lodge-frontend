import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContactUs } from "@/hooks/use-contact";
import { Send } from "lucide-react";
import type { ContactUsData } from "@/types";
import { Spinner } from "@/components/ui/spinner";

const contactUsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactUsForm() {
  const { mutate: submitContact, isPending } = useContactUs();

  const form = useForm<ContactUsData>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactUsData) => {
    submitContact(values);
  };

  return (
    <Card className="premium-card w-full max-w-2xl mx-auto bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-700 shadow-2xl">
      <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Get in Touch
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Have questions or feedback? We'd love to hear from you.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                    >
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="John Doe"
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                      className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Subject
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="How can we help you?"
                    aria-invalid={fieldState.invalid}
                    className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Your Message
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="Please describe your inquiry in detail..."
                    className="min-h-24 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-premium-accent dark:focus:border-premium-accent focus:ring-2 focus:ring-premium-accent/20 bg-white dark:bg-black/60"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    We typically respond within 24 hours on business days.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              className="w-fulltext-base font-semibold bg-premium-accent text-white hover:bg-premium-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isPending}
              size="lg"
            >
              {isPending ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
