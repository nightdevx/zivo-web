import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FolderPlus, ImageIcon, Plus } from "lucide-react";
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
import {
  useGetAlbumsByCompanyId,
  useCreateAlbum,
} from "@/lib/hooks/albums.hook";
import { AlbumInsert } from "@/lib/models/albums.model";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

// Fotoğraf tipi tanımı
type Photo = {
  id: string;
  url: string;
  name: string;
  uploadDate: string;
  albumId?: number;
};

interface AlbumsTabProps {
  photos: Photo[];
  isNewAlbumDialogOpen: boolean;
  setIsNewAlbumDialogOpen: (open: boolean) => void;
}

const AlbumsTab: React.FC<AlbumsTabProps> = ({
  photos,
  isNewAlbumDialogOpen,
  setIsNewAlbumDialogOpen,
}) => {
  const { data: albums } = useGetAlbumsByCompanyId();
  console.log("photos", photos);
  const { data: services } = useGetAllServices();
  const serviceOptions =
    services?.map((service) => ({
      value: service.id,
      label: service.name,
    })) || [];

  const [selectedService, setSelectedService] = useState<string>();
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [coverImage, setCoverImage] = useState<Photo | null>(null);
  const setCoverImageHandler = (photo: Photo) => {
    setCoverImage((prevCoverImage) =>
      prevCoverImage?.id === photo.id ? null : photo
    );
  };

  const { mutate: createAlbum } = useCreateAlbum();

  const togglePhotoSelection = (photo: Photo) => {
    setSelectedPhotos((prevSelectedPhotos) => {
      if (prevSelectedPhotos.some((p) => p.id === photo.id)) {
        // Eğer fotoğraf zaten seçiliyse, onu kaldır
        return prevSelectedPhotos.filter((p) => p.id !== photo.id);
      } else {
        // Eğer fotoğraf seçili değilse, onu ekle
        return [...prevSelectedPhotos, photo];
      }
    });
  };

  const handleCreateAlbum = () => {
    if (!selectedService) {
      toast.error("Please select a service");
      return;
    }
    if (selectedPhotos.length === 0) {
      toast.error("Please select at least one photo");
      return;
    }
    const newAlbum: AlbumInsert = {
      service_id: selectedService,
      images: selectedPhotos.map((photo) => ({
        image_id: photo.id,
      })),
      cover_image: coverImage ? coverImage.id : null,
    };
    createAlbum(newAlbum, {
      onSuccess: () => {
        toast.success("Album created successfully");
        setIsNewAlbumDialogOpen(false);
        setSelectedPhotos([]);
        setCoverImage(null);
        setSelectedService("");
      },
      onError: () => {
        toast.error("Failed to create album");
      },
    });
  };

  if (!albums) {
    return (
      <TabsContent value="albums" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <Progress value={100} />
          </CardContent>
        </Card>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="albums" className="mt-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {albums.length > 0 &&
              albums.map((album) => (
                <div
                  key={album.id}
                  className="group relative cursor-pointer overflow-hidden rounded-lg border"
                >
                  <div className=" overflow-hidden">
                    <LazyLoadImage
                      src={album.cover_image.url || "/placeholder.svg"}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white">
                      <h3 className="font-bold">{album.service.name}</h3>
                      <p className="text-sm">{album.images.length} photos</p>
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
                                ? coverImage?.id === photo.id
                                  ? "border-green-500"
                                  : "border-primary"
                                : "border-transparent"
                            }`}
                            onClick={() => togglePhotoSelection(photo)}
                          >
                            <img
                              src={photo.url || "/placeholder.svg"}
                              alt={photo.name}
                              className="object-cover aspect-square w-full h-full"
                            />
                            {selectedPhotos.some((p) => p.id === photo.id) && (
                              <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-1">
                                <Plus className="h-3 w-3" />
                              </div>
                            )}
                            {coverImage?.id === photo.id && (
                              <div className="absolute bottom-1 left-1 bg-green-500 text-white rounded-full p-1">
                                <ImageIcon className="h-3 w-3" />
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

                  {/* Cover Image Selection */}
                  {selectedPhotos.length > 0 && (
                    <div className="grid gap-2">
                      <Label>Cover Image</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                          {coverImage ? (
                            <img
                              src={coverImage.url || "/placeholder.svg"}
                              alt="Cover"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-muted">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {coverImage ? coverImage.name : "No cover selected"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Select a cover image from your selected photos
                          </p>
                        </div>
                      </div>

                      {selectedPhotos.length > 0 && (
                        <ScrollArea className="h-[80px] border rounded-md p-2">
                          <div className="flex gap-2">
                            {selectedPhotos.map((photo) => (
                              <div
                                key={photo.id}
                                className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                                  coverImage?.id === photo.id
                                    ? "border-green-500"
                                    : "border-transparent"
                                }`}
                                onClick={() => setCoverImageHandler(photo)}
                              >
                                <img
                                  src={photo.url || "/placeholder.svg"}
                                  alt={photo.name}
                                  className="object-cover w-16 h-16"
                                />
                                {coverImage?.id === photo.id && (
                                  <div className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1">
                                    <ImageIcon className="h-3 w-3" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsNewAlbumDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateAlbum}
                    disabled={selectedPhotos.length === 0 || !coverImage}
                  >
                    Create Album
                  </Button>
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
