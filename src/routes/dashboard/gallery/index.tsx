import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { createFileRoute } from "@tanstack/react-router";
import { useUploadFile } from "@/lib/hooks/file.hook";
import PhotosTab from "@/components/gallery/photos-tab";
import VideosTab from "@/components/gallery/videos-tab";
import AlbumsTab from "@/components/gallery/albums-tab";
import {
  GetImagesByCompanyIdQueryOptions,
  useCreateImages,
} from "@/lib/hooks/images.hook";
import { Image, ImageInsert } from "@/lib/models/images.model";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/gallery/")({
  component: GalleryPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(GetImagesByCompanyIdQueryOptions);
  },
});

type Photo = {
  id: string;
  url: string;
  name: string;
  uploadDate: string;
  albumId?: number;
};

export default function GalleryPage() {
  const imagesQuery = useSuspenseQuery(GetImagesByCompanyIdQueryOptions);
  const images: Image[] = imagesQuery.data || [];

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isNewAlbumDialogOpen, setIsNewAlbumDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadFile } = useUploadFile();
  const { mutate: createImages } = useCreateImages();

  const [photos, setPhotos] = useState<Photo[]>(
    images.map((image, _) => ({
      id: image.id,
      url: image.image_url || "",
      name: image.image_path.split("/").pop() || "",
      uploadDate: new Date(image.uploaded_at || "").toLocaleDateString("tr-TR"),
    }))
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const fileArray = Array.from(files);
    const uploadedFilePaths: string[] = [];

    try {
      for (const [index, file] of fileArray.entries()) {
        await new Promise<void>((resolve, reject) => {
          uploadFile(file, {
            onSuccess: (uploadedFileUrl) => {
              uploadedFilePaths.push(uploadedFileUrl);
              resolve();
            },
            onError: () => {
              toast.error(`"${file.name}" yüklenirken bir hata oluştu.`);
              reject();
            },
          });
        });

        setUploadProgress(Math.round(((index + 1) / fileArray.length) * 100));
      }

      // Geçici olarak görselleri ekle
      const tempPhotos = uploadedFilePaths.map((path, index) => ({
        id: (photos.length + index + 1).toString(),
        url: path,
        name: fileArray[index].name,
        uploadDate: new Date().toLocaleDateString("tr-TR"),
      }));

      setPhotos((prev) => [...tempPhotos, ...prev]);

      // Convert uploadedFilePaths to ImageInsert[]
      const imageInserts: ImageInsert[] = uploadedFilePaths.map((path) => ({
        image_path: path,
      }));

      // Create images using the ImageInsert array
      createImages(imageInserts, {
        onSuccess: (createdImages) => {
          // API'den dönen verilerle güncelle
          const newPhotos = createdImages.map((image, index) => ({
            id: (photos.length + index + 1).toString(),
            url: image.image_url || "",
            name: fileArray[index].name,
            uploadDate: new Date().toLocaleDateString("tr-TR"),
          }));

          setPhotos((prev) => {
            // Geçici görselleri API'den dönenlerle değiştir
            const updatedPhotos = prev.filter(
              (photo) => !tempPhotos.some((temp) => temp.id === photo.id)
            );
            return [...newPhotos, ...updatedPhotos];
          });

          toast.success("Görseller başarıyla oluşturuldu.");
        },
        onError: () => {
          toast.error("Görseller oluşturulurken bir hata oluştu.");
        },
      });

      toast.success("Yükleme tamamlandı", {
        description: `${fileArray.length} fotoğraf başarıyla yüklendi.`,
      });
    } catch {
      toast.error("Bazı dosyalar yüklenemedi.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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
              max={5}
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
            setIsNewAlbumDialogOpen={setIsNewAlbumDialogOpen}
            isNewAlbumDialogOpen={isNewAlbumDialogOpen}
            photos={photos}
          />
        </Tabs>
      </main>
    </div>
  );
}
