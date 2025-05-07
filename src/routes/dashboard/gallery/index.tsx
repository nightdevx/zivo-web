import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { createFileRoute } from "@tanstack/react-router";
import PhotosTab from "@/components/gallery/photos-tab";
import VideosTab from "@/components/gallery/videos-tab";
import AlbumsTab from "@/components/gallery/albums-tab";

export const Route = createFileRoute("/dashboard/gallery/")({
  component: GalleryPage,
});
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

export default function GalleryPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isNewAlbumDialogOpen, setIsNewAlbumDialogOpen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Örnek albümler
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 1,
      coverImage: "/barber1.jpg",
      photoCount: 12,
    },
    {
      id: 2,
      coverImage: "/barber2.jpg",
      photoCount: 8,
    },
    {
      id: 3,
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
    const newAlbum: Album = {
      id: albums.length + 1,
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
    setSelectedPhotos([]);
    setIsNewAlbumDialogOpen(false);

    toast("Albüm oluşturuldu");
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
            <TabsTrigger value="albums">Albums For Services</TabsTrigger>
          </TabsList>

          <PhotosTab photos={photos} />

          <VideosTab />

          <AlbumsTab
            albums={albums}
            setIsNewAlbumDialogOpen={setIsNewAlbumDialogOpen}
            togglePhotoSelection={togglePhotoSelection}
            handleCreateAlbum={handleCreateAlbum}
            isNewAlbumDialogOpen={isNewAlbumDialogOpen}
            selectedPhotos={selectedPhotos}
            photos={photos} // Pass the photos prop to AlbumsTab
          />
        </Tabs>
      </main>
    </div>
  );
}
