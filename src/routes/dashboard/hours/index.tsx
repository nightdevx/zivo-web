"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/hours/")({
  component: WorkingHoursPage,
});

function WorkingHoursPage() {
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: false,
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Working Hours</h1>
        </div>

        <Tabs defaultValue="schedule">
          <TabsList>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="staff">Staff Availability</TabsTrigger>
            <TabsTrigger value="holidays">Holidays & Time Off</TabsTrigger>
          </TabsList>

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

                      <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
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
                              <Label htmlFor={`${day}-lunch-end`}>
                                Break end
                              </Label>
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

                            <div className="hidden md:flex flex-col space-y-1">
                              <Label htmlFor={`${day}-slot-duration`}>
                                Appointment slots
                              </Label>
                              <Select defaultValue="30">
                                <SelectTrigger id={`${day}-slot-duration`}>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="15">15 min</SelectItem>
                                  <SelectItem value="30">30 min</SelectItem>
                                  <SelectItem value="45">45 min</SelectItem>
                                  <SelectItem value="60">60 min</SelectItem>
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

          <TabsContent value="staff" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff Availability</CardTitle>
                <CardDescription>
                  Manage individual staff working hours and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="zehra">
                  <TabsList>
                    <TabsTrigger value="zehra">Zehra</TabsTrigger>
                    <TabsTrigger value="ahmet">Ahmet</TabsTrigger>
                    <TabsTrigger value="selin">Selin</TabsTrigger>
                    <TabsTrigger value="mehmet">Mehmet</TabsTrigger>
                  </TabsList>

                  <TabsContent value="zehra" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries({
                        monday: "Pazartesi",
                        tuesday: "Salı",
                        wednesday: "Çarşamba",
                        thursday: "Perşembe",
                        friday: "Cuma",
                        saturday: "Cumartesi",
                      }).map(([day, label]) => (
                        <div
                          key={day}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="font-medium">{label}</div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-muted-foreground">
                              09:00 - 18:00
                            </div>
                            <Switch defaultChecked id={`zehra-${day}`} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="ahmet" className="mt-4">
                    <p className="text-muted-foreground">
                      Select a staff member to view their availability.
                    </p>
                  </TabsContent>

                  <TabsContent value="selin" className="mt-4">
                    <p className="text-muted-foreground">
                      Select a staff member to view their availability.
                    </p>
                  </TabsContent>

                  <TabsContent value="mehmet" className="mt-4">
                    <p className="text-muted-foreground">
                      Select a staff member to view their availability.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holidays" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Holidays & Time Off</CardTitle>
                <CardDescription>
                  Mark dates when your business is closed or staff is
                  unavailable
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
        </Tabs>
      </main>
    </div>
  );
}
