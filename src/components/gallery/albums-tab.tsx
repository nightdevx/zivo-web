import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FolderPlus, Plus } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllServices } from "@/lib/hooks/service.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

// Albüm tipi tanımı
type Album = {
  id: number;
  coverImage: string;
  photoCount: number;
};

// Fotoğraf tipi tanımı
type Photo = {
  id: number;
  url: string;
  name: string;
  uploadDate: string;
  albumId?: number;
};

interface AlbumsTabProps {
  albums: Album[];
  photos: Photo[];
  selectedPhotos: Photo[];
  isNewAlbumDialogOpen: boolean;
  setIsNewAlbumDialogOpen: (open: boolean) => void;
  togglePhotoSelection: (photo: Photo) => void;
  handleCreateAlbum: () => void;
}

const AlbumsTab: React.FC<AlbumsTabProps> = ({
  albums,
  photos,
  selectedPhotos,
  isNewAlbumDialogOpen,
  setIsNewAlbumDialogOpen,
  togglePhotoSelection,
  handleCreateAlbum,
}) => {
  const { data: services } = useGetAllServices();
  const serviceOptions =
    services?.map((service) => ({
      value: service.id,
      label: service.name,
    })) || [];

  const [selectedService, setSelectedService] = useState<string>();

  return (
    <TabsContent value="albums" className="mt-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <div
                key={album.id}
                className="group relative cursor-pointer overflow-hidden rounded-lg border"
              >
                <div className="aspect-video overflow-hidden">
                  <LazyLoadImage
                    src={album.coverImage || "/placeholder.svg"}
                    width={300}
                    height={200}
                    className="object-cover w-full h-full transition-all group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white">
                    <h3 className="font-bold">{selectedService}</h3>
                    <p className="text-sm">{album.photoCount} photos</p>
                  </div>
                </div>
              </div>
            ))}

            <Dialog
              open={isNewAlbumDialogOpen}
              onOpenChange={setIsNewAlbumDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex h-[168px] flex-col items-center justify-center rounded-lg border border-dashed"
                >
                  <FolderPlus className="mb-2 h-6 w-6" />
                  <div className="text-sm font-medium">
                    Create New Album For Service
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Album For Service</DialogTitle>
                  <DialogDescription>
                    Create a new album to organize your photos. You can add
                    photos to this album later.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="service">Select Service</Label>
                    <Select
                      defaultValue={selectedService}
                      onValueChange={setSelectedService}
                    >
                      <SelectTrigger id="service" className="w-full">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Select Photos</Label>
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
                  <Button
                    variant="outline"
                    onClick={() => setIsNewAlbumDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAlbum}>Create Album</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AlbumsTab;
