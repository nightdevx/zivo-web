import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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

const NotificationsTab: React.FC = () => {
  const handleSave = () => {
    // Add save logic here
    console.log("Changes saved");
  };

  return (
    <TabsContent value="notifications" className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Manage how you receive notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Appointments</Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when a new appointment is booked
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Appointment Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Send reminder emails to clients before their appointment
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cancellations</Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when an appointment is cancelled
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional emails and updates
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">SMS Notifications</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Appointment Confirmations</Label>
                <p className="text-sm text-muted-foreground">
                  Send SMS confirmations to clients for new appointments
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Appointment Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Send SMS reminders to clients before their appointment
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-time">
                Reminder Time (hours before)
              </Label>
              <Select defaultValue="24">
                <SelectTrigger id="reminder-time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="12">12 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="48">48 hours</SelectItem>
                </SelectContent>
              </Select>
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

export default NotificationsTab;
