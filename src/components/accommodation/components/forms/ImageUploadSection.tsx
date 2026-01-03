import { useState, useRef } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Upload, X, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccommodationImage } from "@/types";
import {
  useUploadAccommodationImages,
  useDeleteAccommodationImage,
} from "@/hooks/use-accommodations";

interface ImageUploadSectionProps {
  accommodationId: string;
  images: AccommodationImage[];
  onImagesChange?: () => void;
}

export function ImageUploadSection({
  accommodationId,
  images,
  onImagesChange,
}: ImageUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);

  const { mutate: uploadImages, isPending: isUploading } =
    useUploadAccommodationImages();
  const { mutate: deleteImage, isPending: isDeleting } =
    useDeleteAccommodationImage();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isUnder5MB = file.size <= 5 * 1024 * 1024; // 5MB
      return isImage && isUnder5MB;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveSelected = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images[]", file);
    });

    uploadImages(
      { id: accommodationId, formData },
      {
        onSuccess: () => {
          setSelectedFiles([]);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          onImagesChange?.();
        },
      },
    );
  };

  const handleDeleteImage = () => {
    if (!deleteImageId) return;

    deleteImage(
      { id: accommodationId, imageId: deleteImageId },
      {
        onSuccess: () => {
          setDeleteImageId(null);
          onImagesChange?.();
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          Upload images for this accommodation. Maximum 5MB per image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="images">Select Images</Label>
            <Input
              ref={fileInputRef}
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Accepted formats: JPG, PNG, WebP. Max size: 5MB per image.
            </p>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({selectedFiles.length})</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg border bg-muted overflow-hidden group"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSelected(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {selectedFiles.length} Image
                    {selectedFiles.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Existing Images */}
        {images && images.length > 0 && (
          <div className="space-y-4">
            <Label>Uploaded Images ({images.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={cn(
                    "relative aspect-square rounded-lg border overflow-hidden group",
                    image.is_featured && "ring-2 ring-primary",
                  )}
                >
                  <img
                    src={image.thumbnail_url || image.url}
                    alt={image.alt_text || "Accommodation image"}
                    className="w-full h-full object-cover"
                  />

                  {image.is_featured && (
                    <div className="absolute top-2 left-2 p-1 rounded-full bg-primary text-primary-foreground">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setDeleteImageId(image.id)}
                    disabled={isDeleting}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && selectedFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              No images uploaded yet.
              <br />
              Select files above to get started.
            </p>
          </div>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteImageId}
        onOpenChange={() => setDeleteImageId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this image. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteImage}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
