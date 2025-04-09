"use client";

import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Download, Share, Pencil } from "lucide-react";

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Dialog key={i}>
          <DialogTrigger asChild>
            <div
              className="overflow-hidden rounded-lg border cursor-pointer group relative aspect-square"
              onClick={() => setSelectedImage(i)}
            >
              <LazyLoadImage
                src={`/placeholder.svg?height=300&width=300&text=Image ${i + 1}`}
                alt={`Gallery image ${i + 1}`}
                width={300}
                height={300}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">View</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Hair Style Photo {i + 1}</DialogTitle>
              <DialogDescription>Uploaded on 12 Nisan 2025</DialogDescription>
            </DialogHeader>
            <div className="mt-4 rounded-lg overflow-hidden">
              <LazyLoadImage
                src={`/placeholder.svg?height=600&width=800&text=Image ${i + 1}`}
                alt={`Gallery image ${i + 1}`}
                width={800}
                height={600}
                className="object-contain w-full"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
