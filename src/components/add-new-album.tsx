import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Plus } from "lucide-react";
import { DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Photo = {
  id: number;
  url: string;
  name: string;
  uploadDate: string;
  albumId?: number;
};

interface AddNewAlbumProps {
  photos: Photo[];
  onCreateAlbum: (
    name: string,
    description: string,
    selectedPhotos: Photo[]
  ) => void;
  onCancel: () => void;
}

const AddNewAlbum: React.FC<AddNewAlbumProps> = ({
  photos,
  onCreateAlbum,
  onCancel,
}) => {
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

  const togglePhotoSelection = (photo: Photo) => {
    setSelectedPhotos((prev) =>
      prev.some((p) => p.id === photo.id)
        ? prev.filter((p) => p.id !== photo.id)
        : [...prev, photo]
    );
  };

  const handleCreateAlbum = () => {
    onCreateAlbum(newAlbumName, newAlbumDescription, selectedPhotos);
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Create New Album</DialogTitle>
        <DialogDescription>
          Create a new album to organize your photos. You can add photos to this
          album later.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="album-name">Album Name</Label>
          <Input
            id="album-name"
            placeholder="Enter album name"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="album-description">Description (Optional)</Label>
          <Textarea
            id="album-description"
            placeholder="Enter album description"
            value={newAlbumDescription}
            onChange={(e) => setNewAlbumDescription(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Select Photos (Optional)</Label>
          <ScrollArea className="h-[200px] border rounded-md p-2">
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedPhotos.some((p) => p.id === photo.id)
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => togglePhotoSelection(photo)}
                >
                  <LazyLoadImage
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.name}
                    width={100}
                    height={100}
                    className="object-cover aspect-square"
                  />
                  {selectedPhotos.some((p) => p.id === photo.id) && (
                    <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-1">
                      <Plus className="h-3 w-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <p className="text-sm text-muted-foreground">
            {selectedPhotos.length} photos selected
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="outline" onClick={handleCreateAlbum}>
          Create Album
        </Button>
      </DialogFooter>
    </div>
  );
};

export default AddNewAlbum;
