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
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors shadow-sm",
                    isCompleted && "bg-premium-accent text-white",
                    isCurrent && "bg-premium-accent text-white",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
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
                    isCurrent
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400",
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
                    index < currentStepIndex
                      ? "bg-premium-accent"
                      : "bg-gray-200 dark:bg-gray-700",
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
