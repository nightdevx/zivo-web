import React from "react";
import { Button } from "@/components/ui/button";

interface ColorTheme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

interface ThemePreviewProps {
  colorTheme: ColorTheme;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ colorTheme }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Preview</h3>
      <div
        className="p-6 rounded-lg"
        style={{ backgroundColor: colorTheme.background }}
      >
        <div className="space-y-4">
          <h4 className="text-xl font-bold" style={{ color: colorTheme.text }}>
            Your Business Name
          </h4>
          <p style={{ color: colorTheme.text }}>
            This is how your branding will appear to clients.
          </p>
          <div className="flex gap-2">
            <Button
              style={{
                backgroundColor: colorTheme.primary,
                color: "#ffffff",
              }}
            >
              Primary Button
            </Button>
            <Button
              variant="outline"
              style={{
                borderColor: colorTheme.secondary,
                color: colorTheme.secondary,
              }}
            >
              Secondary Button
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
