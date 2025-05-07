import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HolidaysTab: React.FC = () => {
  return (
    <TabsContent value="holidays" className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Holidays & Time Off</CardTitle>
          <CardDescription>
            Mark dates when your business is closed or staff is unavailable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <div className="font-medium">National Holidays 2025</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Yılbaşı</span>
                    <span>1 Ocak 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ulusal Egemenlik ve Çocuk Bayramı</span>
                    <span>23 Nisan 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emek ve Dayanışma Günü</span>
                    <span>1 Mayıs 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Atatürk'ü Anma, Gençlik ve Spor Bayramı</span>
                    <span>19 Mayıs 2025</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="font-medium">Upcoming Closures</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Renovations</span>
                    <span>10-12 Mayıs 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Staff Training</span>
                    <span>25 Mayıs 2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Add Holiday</Button>
              <Button>Add Closure</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default HolidaysTab;
