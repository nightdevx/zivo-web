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
import { Trash2, Download, Share, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Photo = {
  id: number;
  url: string;
  name: string;
  uploadDate: string;
  description?: string;
};

export function GalleryGrid() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Example photos
  const [photos, setPhotos] = useState<Photo[]>(
    Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      url: `/placeholder.svg?height=300&width=300&text=Image ${i + 1}`,
      name: `Hair Style Photo ${i + 1}`,
      uploadDate: "April 12, 2025",
      description: i % 3 === 0 ? "Special hairstyle example" : undefined,
    }))
  );

  const handleEditClick = (photo: Photo) => {
    setEditingPhoto(photo);
    setEditName(photo.name);
    setEditDescription(photo.description || "");
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingPhoto) return;

    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === editingPhoto.id
          ? { ...photo, name: editName, description: editDescription }
          : photo
      )
    );

    setIsEditDialogOpen(false);
    toast("Photo updated", {
      description: "Photo details have been successfully updated.",
    });
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    toast("Photo deleted", {
      description: "Photo has been successfully deleted.",
    });
  };

  const handleDownload = (photo: Photo) => {
    // In a real application, file download logic would go here
    toast("Download started", {
      description: `Downloading ${photo.name}...`,
    });
  };

  const handleShare = () => {
    // In a real application, sharing logic would go here
    toast("Share link created", {
      description: "Link copied to clipboard.",
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <Dialog key={photo.id}>
          <DialogTrigger asChild>
            <div className="overflow-hidden rounded-lg border cursor-pointer group relative aspect-square">
              <LazyLoadImage
                src={photo.url || "/placeholder.svg"}
                alt={photo.name}
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
              <DialogTitle>{photo.name}</DialogTitle>
              <DialogDescription>
                Uploaded on {photo.uploadDate}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 rounded-lg overflow-hidden">
              <LazyLoadImage
                src={photo.url || "/placeholder.svg"}
                alt={photo.name}
                width={800}
                height={600}
                className="object-contain w-full"
              />
            </div>
            {photo.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {photo.description}
              </p>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditClick(photo)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare()}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(photo)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeletePhoto(photo.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
            <DialogDescription>
              Update the details of this photo
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="photo-name">Photo Name</Label>
              <Input
                id="photo-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photo-description">Description (Optional)</Label>
              <Input
                id="photo-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
