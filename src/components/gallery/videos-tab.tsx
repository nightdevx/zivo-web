import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VideosTab: React.FC = () => {
  return (
    <TabsContent value="videos" className="mt-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Upload your first video
            </h3>
            <p className="text-muted-foreground mb-4">
              Share your work with clients by uploading videos of your best
              styles
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
  );
};

export default VideosTab;
