"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, FolderPlus, Grid3X3, List, Upload, Plus } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/gallery/")({
  component: GalleryPage,
});
// Albüm tipi tanımı
type Album = {
  id: number;
  name: string;
  description: string;
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

export default function GalleryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isNewAlbumDialogOpen, setIsNewAlbumDialogOpen] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Örnek albümler
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 1,
      name: "Saç Modelleri 2025",
      description: "En yeni saç modelleri",
      coverImage: "/barber1.jpg",
      photoCount: 12,
    },
    {
      id: 2,
      name: "Tırnak Sanatı",
      description: "Özel tırnak tasarımları",
      coverImage: "/barber2.jpg",
      photoCount: 8,
    },
    {
      id: 3,
      name: "Salon İç Mekanı",
      description: "Salonumuzun iç mekan fotoğrafları",
      coverImage: "/barber3.jpg",
      photoCount: 6,
    },
  ]);

  // Örnek fotoğraflar
  const [photos, setPhotos] = useState<Photo[]>(
    Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      url: `/${i % 2 ? "beauty" : "barber"}${(i % 3) + 1}.jpg`,
      name: `Fotoğraf ${i + 1}`,
      uploadDate: "12 Nisan 2025",
    }))
  );

  // Dosya yükleme işlevi
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Dosya yükleme simülasyonu
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Yeni fotoğrafları ekle
          const newPhotos = Array.from(files).map((file, index) => ({
            id: photos.length + index + 1,
            url: URL.createObjectURL(file),
            name: file.name,
            uploadDate: new Date().toLocaleDateString("tr-TR"),
          }));

          setPhotos((prev) => [...newPhotos, ...prev]);

          toast("Yükleme tamamlandı", {
            description: `${files.length} fotoğraf başarıyla yüklendi.`,
          });

          // Input değerini sıfırla
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }

          return 0;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Albüm oluşturma işlevi
  const handleCreateAlbum = () => {
    if (!newAlbumName.trim()) {
      toast("Hata", {
        description: "Albüm adı boş olamaz.",
      });
      return;
    }

    const newAlbum: Album = {
      id: albums.length + 1,
      name: newAlbumName,
      description: newAlbumDescription,
      coverImage:
        selectedPhotos.length > 0
          ? selectedPhotos[0].url
          : "/placeholder.svg?height=200&width=300&text=New+Album",
      photoCount: selectedPhotos.length,
    };

    setAlbums((prev) => [newAlbum, ...prev]);

    // Seçili fotoğrafları albüme ekle
    if (selectedPhotos.length > 0) {
      setPhotos((prev) =>
        prev.map((photo) =>
          selectedPhotos.some((selected) => selected.id === photo.id)
            ? { ...photo, albumId: newAlbum.id }
            : photo
        )
      );
    }

    // Formu sıfırla
    setNewAlbumName("");
    setNewAlbumDescription("");
    setSelectedPhotos([]);
    setIsNewAlbumDialogOpen(false);

    toast("Albüm oluşturuldu", {
      description: `"${newAlbumName}" albümü başarıyla oluşturuldu.`,
    });
  };

  // Fotoğraf seçme işlevi
  const togglePhotoSelection = (photo: Photo) => {
    if (selectedPhotos.some((p) => p.id === photo.id)) {
      setSelectedPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } else {
      setSelectedPhotos((prev) => [...prev, photo]);
    }
  };

  // Dosya yükleme butonuna tıklama
  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gallery</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
            <Button onClick={handleUploadClick}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {isUploading && (
          <Card className="p-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Yükleniyor...</span>
                <span className="text-sm text-muted-foreground">
                  {uploadProgress}%
                </span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </Card>
        )}

        <Tabs defaultValue="photos">
          <TabsList>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-4">
            <Card>
              <CardContent className="p-6">
                {view === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="overflow-hidden rounded-lg border cursor-pointer group relative aspect-square"
                      >
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
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border divide-y">
                    {photos.map((photo, i) => (
                      <div key={i} className="flex items-center p-4">
                        <div className="flex-shrink-0 mr-4">
                          <LazyLoadImage
                            src={photo.url || "/placeholder.svg"}
                            height={80}
                            width={80}
                            alt={photo.name}
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">{photo.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded on {photo.uploadDate}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Upload your first video
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Share your work with clients by uploading videos of your
                    best styles
                  </p>
                  <div className="mx-auto w-full max-w-sm space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="video-upload">Upload Video</Label>
                      <Input id="video-upload" type="file" accept="video/*" />
                    </div>
                    <Button className="w-full">Upload Video</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                          alt={album.name}
                          width={300}
                          height={200}
                          className="object-cover w-full h-full transition-all group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-white">
                          <h3 className="font-bold">{album.name}</h3>
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
                          Create New Album
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Create New Album</DialogTitle>
                        <DialogDescription>
                          Create a new album to organize your photos. You can
                          add photos to this album later.
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
                          <Label htmlFor="album-description">
                            Description (Optional)
                          </Label>
                          <Textarea
                            id="album-description"
                            placeholder="Enter album description"
                            value={newAlbumDescription}
                            onChange={(e) =>
                              setNewAlbumDescription(e.target.value)
                            }
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
                                    selectedPhotos.some(
                                      (p) => p.id === photo.id
                                    )
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
                                  {selectedPhotos.some(
                                    (p) => p.id === photo.id
                                  ) && (
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
                        <Button onClick={handleCreateAlbum}>
                          Create Album
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
