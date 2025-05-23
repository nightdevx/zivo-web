import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useRef } from "react";

interface ImageSelectProps {
  label: string;
  selectedImage: File | null;
  setSelectedImage?: (image: File | null) => void;
  imageUrl?: string; // Add imageUrl as an optional prop
}

const ImageSelect = ({
  selectedImage,
  setSelectedImage,
  label,
  imageUrl,
}: ImageSelectProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && setSelectedImage) {
      setSelectedImage(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value after selection
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4 border rounded-md">
      <div className="relative">
        <LazyLoadImage
          src={
            imageUrl // Prioritize imageUrl if provided
              ? imageUrl
              : selectedImage
                ? URL.createObjectURL(selectedImage)
                : "https://placehold.co/400x400/png"
          }
          alt={label}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-sm"
          onClick={handleLogoUpload}
        >
          <CameraIcon className="h-3 w-3" />
          <span className="sr-only">Upload Image</span>
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default ImageSelect;
