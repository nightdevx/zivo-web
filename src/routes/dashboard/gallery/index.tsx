import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, FolderPlus, Grid3X3, List, Upload } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GalleryGrid } from "@/components/gallery-grid";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/gallery/")({
  component: GalleryPage,
});
function GalleryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

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
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>

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
                  <GalleryGrid />
                ) : (
                  <div className="rounded-md border divide-y">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex items-center p-4">
                        <div className="flex-shrink-0 mr-4">
                          <LazyLoadImage
                            src={`/placeholder.svg?height=80&width=80&text=Image ${i + 1}`}
                            height={80}
                            width={80}
                            alt={`Gallery image ${i + 1}`}
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">
                            Hair Style Photo {i + 1}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded on 12 Nisan 2025
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
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg border">
                    <div className="aspect-video overflow-hidden">
                      <LazyLoadImage
                        src="/placeholder.svg?height=200&width=300&text=Hair+Styles+2025"
                        alt="Album cover"
                        width={300}
                        height={200}
                        className="object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white">
                        <h3 className="font-bold">Hair Styles 2025</h3>
                        <p className="text-sm">12 photos</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative cursor-pointer overflow-hidden rounded-lg border">
                    <div className="aspect-video overflow-hidden">
                      <LazyLoadImage
                        src="/placeholder.svg?height=200&width=300&text=Nail+Art+Designs"
                        alt="Album cover"
                        width={300}
                        height={200}
                        className="object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white">
                        <h3 className="font-bold">Nail Art Designs</h3>
                        <p className="text-sm">8 photos</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative cursor-pointer overflow-hidden rounded-lg border">
                    <div className="aspect-video overflow-hidden">
                      <LazyLoadImage
                        src="/placeholder.svg?height=200&width=300&text=Salon+Interior"
                        alt="Album cover"
                        width={300}
                        height={200}
                        className="object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white">
                        <h3 className="font-bold">Salon Interior</h3>
                        <p className="text-sm">6 photos</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="flex h-[168px] flex-col items-center justify-center rounded-lg border border-dashed"
                  >
                    <FolderPlus className="mb-2 h-6 w-6" />
                    <div className="text-sm font-medium">Create New Album</div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
