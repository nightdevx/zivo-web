import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";

interface ImageSelectProps {
  label: string;
  selectedImage: string | null;
}
const ImageSelect = ({ selectedImage, label }: ImageSelectProps) => {
  const handleLogoUpload = () => {
    console.log("Logo upload clicked");
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4 border rounded-md">
      <div className="relative">
        <LazyLoadImage
          src={selectedImage || "/default-logo.png"}
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
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default ImageSelect;
