import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Photo = {
  id: string;
  url: string;
  name: string;
  uploadDate: string;
  albumId?: number;
};

interface PhotosTabProps {
  photos: Photo[];
}

const PhotosTab: React.FC<PhotosTabProps> = ({ photos }) => {
  const [view] = useState<"grid" | "list">("grid");

  return (
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
  );
};

export default PhotosTab;
