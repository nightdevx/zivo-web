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

const BrandingTab: React.FC = () => {
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
                <ImageSelect label="Logo" selectedImage="/zivologo.jpg" />

                <ImageSelect label="Cover Image" selectedImage="/beauty5.jpg" />
              </div>
            </div>

            {/* <div className="space-y-4">
              <h3 className="text-lg font-medium">Colors</h3>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Predefined Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {predefinedThemes.map((theme, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => applyPredefinedTheme(theme)}
                    >
                      <div className="flex items-center">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        ></div>
                        <div
                          className="h-4 w-4 rounded-full -ml-1"
                          style={{ backgroundColor: theme.secondary }}
                        ></div>
                      </div>
                      {theme.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Custom Colors</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-md border"
                        style={{ backgroundColor: colorTheme.primary }}
                      ></div>
                      <input
                        type="color"
                        value={colorTheme.primary}
                        onChange={(e) =>
                          handleColorChange("primary", e.target.value)
                        }
                        className="w-full h-8 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-md border"
                        style={{ backgroundColor: colorTheme.secondary }}
                      ></div>
                      <input
                        type="color"
                        value={colorTheme.secondary}
                        onChange={(e) =>
                          handleColorChange("secondary", e.target.value)
                        }
                        className="w-full h-8 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Background</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-md border"
                        style={{ backgroundColor: colorTheme.background }}
                      ></div>
                      <input
                        type="color"
                        value={colorTheme.background}
                        onChange={(e) =>
                          handleColorChange("background", e.target.value)
                        }
                        className="w-full h-8 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Text</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-md border"
                        style={{ backgroundColor: colorTheme.text }}
                      ></div>
                      <input
                        type="color"
                        value={colorTheme.text}
                        onChange={(e) =>
                          handleColorChange("text", e.target.value)
                        }
                        className="w-full h-8 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <ColorThemeSelect />

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BrandingTab;
