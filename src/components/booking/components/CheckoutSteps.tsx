import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutStepsProps {
  currentStep: "guest-info" | "review" | "payment";
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: "guest-info", label: "Guest Information", number: 1 },
    { id: "review", label: "Review Order", number: 2 },
    { id: "payment", label: "Payment", number: 3 },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex-1 flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm mt-2 font-medium hidden sm:block",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-4",
                    index < currentStepIndex ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
