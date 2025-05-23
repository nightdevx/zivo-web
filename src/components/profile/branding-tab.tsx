import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ImageSelect from "./image-select";
import ColorThemeSelect from "./color-theme-select";
import { useState, useEffect } from "react";
import { useUpdateMyCompany } from "@/lib/hooks/companies.hook";
import { useUploadFile } from "@/lib/hooks/file.hook";
import { toast } from "sonner";

interface BrandingTabProps {
  initialLogoUrl?: string;
  initialCoverImageUrl?: string;
}

const BrandingTab: React.FC<BrandingTabProps> = ({
  initialLogoUrl,
  initialCoverImageUrl,
}) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(initialLogoUrl || null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    initialCoverImageUrl || null
  );
  const { mutate: updateMyCompany } = useUpdateMyCompany();
  const { mutate: uploadFile } = useUploadFile();

  const handleUpload = (file: File | null, type: "logo" | "cover_image") => {
    if (file) {
      uploadFile(file, {
        onSuccess: (response) => {
          console.log("File uploaded successfully:", response);
          console.log("File path:", response);
          console.log("File type:", type);
          updateMyCompany(
            {
              companyData: {
                [type]: response,
              },
            },
            {
              onSuccess: () => {
                toast.success("Company images successfully updated!");
              },
              onError: () => {
                toast.error("Company image updates failed!");
              },
            }
          );
        },
      });
    }
  };

  const handleSaveChanges = () => {
    handleUpload(logo, "logo");
    handleUpload(coverImage, "cover_image");
  };

  useEffect(() => {
    if (initialLogoUrl) {
      setLogoUrl(initialLogoUrl);
    }
    if (initialCoverImageUrl) {
      setCoverImageUrl(initialCoverImageUrl);
    }
  }, [initialLogoUrl, initialCoverImageUrl]);

  return (
    <TabsContent value="branding">
      <Card>
        <CardHeader>
          <CardTitle>Branding & Appearance</CardTitle>
          <CardDescription>
            Customize how your business appears to clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Logo & Images</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <ImageSelect
                  label="Logo"
                  selectedImage={logo}
                  setSelectedImage={setLogo}
                  imageUrl={logoUrl || undefined} // Pass the URL to ImageSelect
                />

                <ImageSelect
                  label="Cover Image"
                  selectedImage={coverImage}
                  setSelectedImage={setCoverImage}
                  imageUrl={coverImageUrl || undefined} // Pass the URL to ImageSelect
                />
              </div>
            </div>

            <ColorThemeSelect />

            <div className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BrandingTab;
