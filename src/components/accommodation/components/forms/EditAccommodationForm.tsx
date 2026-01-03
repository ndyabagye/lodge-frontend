import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccommodationForm } from "./AccommodationForm";
import { ImageUploadSection } from "./ImageUploadSection";
import {
  useAccommodation,
  useUpdateAccommodation,
} from "@/hooks/use-accommodations";
import { Loading } from "@/components/common/Loading";
import type { UpdateAccommodationInput } from "@/types";
import { toast } from "sonner";

export function EditAccommodationForm() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });

  const {
    data: accommodation,
    isLoading,
    refetch,
  } = useAccommodation(id as string);
  const { mutate: updateAccommodation, isPending } = useUpdateAccommodation();

  const handleSubmit = (data: UpdateAccommodationInput) => {
    if (!id) return;

    updateAccommodation(
      { id: id as string, data },
      {
        onSuccess: () => {
          toast.success("Accommodation updated successfully");
          navigate({ to: "/admin/accommodations" });
          // Optionally navigate back or show success message
          // navigate({ to: "/admin/accommodations" });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loading />
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <p className="text-lg text-muted-foreground">Accommodation not found</p>
        <Button onClick={() => navigate({ to: "/admin/accommodations" })}>
          Back to Accommodations
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/admin/accommodations" })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Edit Accommodation</h1>
          <p className="text-muted-foreground">{accommodation.name}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {/* Tabs for Info and Images */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="images">
            Images ({accommodation.images?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <AccommodationForm
            defaultValues={accommodation}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
            submitLabel="Update Accommodation"
          />
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <ImageUploadSection
            accommodationId={accommodation.id}
            images={accommodation.images || []}
            onImagesChange={() => refetch()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
