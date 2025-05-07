import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const GeneralTab: React.FC = () => {
  const handleSave = () => {
    // Implement save logic here
    console.log("Changes saved");
  };

  return (
    <TabsContent value="general" className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Language & Region</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="tr">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select defaultValue="europe-istanbul">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-istanbul">
                      Europe/Istanbul (UTC+03:00)
                    </SelectItem>
                    <SelectItem value="europe-london">
                      Europe/London (UTC+00:00)
                    </SelectItem>
                    <SelectItem value="america-new_york">
                      America/New York (UTC-05:00)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Appointment Settings</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Confirmations</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically confirm appointments when booked
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Cancellations</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow clients to cancel appointments online
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellation-period">
                  Cancellation Period (hours)
                </Label>
                <Input
                  id="cancellation-period"
                  type="number"
                  defaultValue="24"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum hours before appointment time that cancellations are
                  allowed
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Business Hours Display</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Business Hours on Website</Label>
                <p className="text-sm text-muted-foreground">
                  Display your working hours on your public profile
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default GeneralTab;
