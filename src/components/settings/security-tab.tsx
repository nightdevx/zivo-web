import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const SecurityTab: React.FC = () => {
  return (
    <TabsContent value="security" className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security and privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password</h3>

            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>

            <Button>Change Password</Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Session Management</h3>

            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-muted-foreground">
                    Istanbul, Turkey • Chrome on Windows
                  </p>
                </div>
                <Badge>Active Now</Badge>
              </div>
            </div>

            <Button variant="outline">Sign Out of All Sessions</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SecurityTab;
