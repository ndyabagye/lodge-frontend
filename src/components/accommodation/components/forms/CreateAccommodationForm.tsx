import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccommodationForm } from "./AccommodationForm";
import { useCreateAccommodation } from "@/hooks/use-accommodations";
import type { CreateAccommodationInput } from "@/types";
import { ImageUploadSection } from "./ImageUploadSection";

export function CreateAccommodationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"info" | "images">("info");
  const [createdId, setCreatedId] = useState<string | null>(null);

  const { mutate: createAccommodation, isPending } = useCreateAccommodation();

  const handleSubmit = (data: CreateAccommodationInput) => {
    createAccommodation(data, {
      onSuccess: (accommodation) => {
        setCreatedId(accommodation.id);
        setStep("images");
      },
    });
  };

  const handleFinish = () => {
    navigate({ to: "/admin/accommodations" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (step === "images") {
              setStep("info");
            } else {
              window.history.back();
            }
          }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Accommodation</h1>
          <p className="text-muted-foreground">
            {step === "info"
              ? "Fill in the accommodation details"
              : "Upload images for your accommodation"}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-2 ${
            step === "info" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step === "info" || createdId
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="font-medium">Basic Information</span>
        </div>
        <div className="flex-1 h-px bg-border" />
        <div
          className={`flex items-center gap-2 ${
            step === "images" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step === "images"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="font-medium">Images</span>
        </div>
      </div>

      {/* Form Content */}
      {step === "info" ? (
        <AccommodationForm
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          submitLabel="Continue to Images"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-muted/50 border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              Accommodation Created Successfully!
            </h2>
            <p className="text-muted-foreground mb-4">
              You can now upload images for this accommodation, or skip this
              step and add them later.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleFinish}>
                Skip & Finish
              </Button>
              <Button onClick={() => setStep("images")}>Upload Images</Button>
            </div>
          </div>

          {createdId && (
            <>
              <ImageUploadSection
                accommodationId={createdId}
                images={[]}
                onImagesChange={() => {}}
              />
              <div className="flex justify-end">
                <Button onClick={handleFinish}>Finish</Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
