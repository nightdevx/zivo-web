import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import ThemePreview from "./theme-preview";

interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

interface ColorTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
// Önceden tanımlanmış renk temaları
const predefinedThemes = [
  {
    name: "Mor",
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    background: "#f8fafc",
    text: "#1e293b",
  },
  {
    name: "Mavi",
    primary: "#3b82f6",
    secondary: "#2563eb",
    background: "#f8fafc",
    text: "#1e293b",
  },
  {
    name: "Yeşil",
    primary: "#10b981",
    secondary: "#059669",
    background: "#f8fafc",
    text: "#1e293b",
  },
  {
    name: "Kırmızı",
    primary: "#ef4444",
    secondary: "#dc2626",
    background: "#f8fafc",
    text: "#1e293b",
  },
  {
    name: "Turuncu",
    primary: "#f97316",
    secondary: "#ea580c",
    background: "#f8fafc",
    text: "#1e293b",
  },
];

const ColorThemeSelect: React.FC = () => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>({
    primary: "#8b5cf6", // Mor
    secondary: "#7c3aed", // Koyu mor
    background: "#f8fafc", // Açık gri
    text: "#1e293b", // Koyu gri
  });

  const applyPredefinedTheme = (theme: Theme) => {
    setColorTheme({
      primary: theme.primary,
      secondary: theme.secondary,
      background: theme.background,
      text: theme.text,
    });
  };

  const handleColorChange = (key: keyof ColorTheme, value: string) => {
    setColorTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <div className="space-y-4">
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
                  onChange={(e) => handleColorChange("primary", e.target.value)}
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
                  onChange={(e) => handleColorChange("text", e.target.value)}
                  className="w-full h-8 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThemePreview colorTheme={colorTheme} />
    </div>
  );
};

export default ColorThemeSelect;
