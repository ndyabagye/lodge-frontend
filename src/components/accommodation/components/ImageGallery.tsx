import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { AccommodationImage, ActivityImage } from "@/types";

interface ImageGalleryProps {
  images: AccommodationImage[] | ActivityImage[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-125 bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  const sortedImages = [...images].sort((a, b) => a.order - b.order);
  const mainImage = sortedImages[selectedIndex];
  const thumbnails = sortedImages.slice(0, 5);

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? sortedImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === sortedImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <>
      <div className="w-full">
        {/* Main Image */}
        <div className="relative h-125 bg-muted group">
          <img
            src={mainImage.url}
            alt={mainImage.alt_text || name}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {sortedImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Fullscreen Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 bottom-4"
            onClick={() => setIsOpen(true)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Image Counter */}
          <div className="absolute left-4 bottom-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
            {selectedIndex + 1} / {sortedImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {sortedImages.length > 1 && (
          <div className="container mx-auto px-4 -mt-8 relative z-10">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {thumbnails.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedIndex(index)}
                  className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedIndex === index
                      ? "border-primary scale-105"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image.thumbnail_url || image.url}
                    alt={image.alt_text || `${name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {sortedImages.length > 5 && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="shrink-0 w-24 h-24 rounded-lg bg-muted flex items-center justify-center text-sm font-medium hover:bg-muted/80"
                >
                  +{sortedImages.length - 5}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img
              src={sortedImages[selectedIndex].url}
              alt={sortedImages[selectedIndex].alt_text || name}
              className="max-w-full max-h-full object-contain"
            />

            {sortedImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-md">
              {selectedIndex + 1} / {sortedImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
