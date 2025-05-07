import React, { useState } from "react";

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

interface WorkingDays {
  workingDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  setWorkingDays: React.Dispatch<
    React.SetStateAction<{
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    }>
  >;
}

const ScheduleTab: React.FC<WorkingDays> = ({
  workingDays,
  setWorkingDays,
}: WorkingDays) => {
  return (
    <TabsContent value="schedule" className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your regular working hours for appointment scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries({
              monday: "Pazartesi",
              tuesday: "Salı",
              wednesday: "Çarşamba",
              thursday: "Perşembe",
              friday: "Cuma",
              saturday: "Cumartesi",
              sunday: "Pazar",
            }).map(([day, label]) => (
              <div
                key={day}
                className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center"
              >
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${day}-active`}
                    checked={workingDays[day as keyof typeof workingDays]}
                    onCheckedChange={(checked) => {
                      setWorkingDays({ ...workingDays, [day]: checked });
                    }}
                  />
                  <Label htmlFor={`${day}-active`}>{label}</Label>
                </div>

                <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  {workingDays[day as keyof typeof workingDays] ? (
                    <>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor={`${day}-opening`}>Opening</Label>
                        <Select defaultValue="09:00">
                          <SelectTrigger id={`${day}-opening`}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="08:00">08:00</SelectItem>
                            <SelectItem value="08:30">08:30</SelectItem>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="09:30">09:30</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <Label htmlFor={`${day}-closing`}>Closing</Label>
                        <Select defaultValue="18:00">
                          <SelectTrigger id={`${day}-closing`}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="17:00">17:00</SelectItem>
                            <SelectItem value="17:30">17:30</SelectItem>
                            <SelectItem value="18:00">18:00</SelectItem>
                            <SelectItem value="18:30">18:30</SelectItem>
                            <SelectItem value="19:00">19:00</SelectItem>
                            <SelectItem value="19:30">19:30</SelectItem>
                            <SelectItem value="20:00">20:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="hidden md:flex flex-col space-y-1">
                        <Label htmlFor={`${day}-lunch-start`}>
                          Break start
                        </Label>
                        <Select defaultValue="13:00">
                          <SelectTrigger id={`${day}-lunch-start`}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="12:30">12:30</SelectItem>
                            <SelectItem value="13:00">13:00</SelectItem>
                            <SelectItem value="13:30">13:30</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="hidden md:flex flex-col space-y-1">
                        <Label htmlFor={`${day}-lunch-end`}>Break end</Label>
                        <Select defaultValue="14:00">
                          <SelectTrigger id={`${day}-lunch-end`}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="13:00">13:00</SelectItem>
                            <SelectItem value="13:30">13:30</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="14:30">14:30</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 md:col-span-5 text-muted-foreground italic">
                      Closed
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ScheduleTab;
