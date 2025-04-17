import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Filter, Plus, Search } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppointmentsTable } from "@/components/appointments-table";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export const Route = createFileRoute("/dashboard/appointments/")({
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Example appointments for the selected date
  const appointmentsForDate = [
    {
      id: 1,
      time: "10:00 - 11:30",
      client: "Ayse Yilmaz",
      service: "Haircut & Blow-dry",
      notes: "Transition from long hair to a short style is requested",
      status: "confirmed",
    },
    {
      id: 2,
      time: "12:00 - 13:00",
      client: "Mehmet Demir",
      service: "Beard Trim",
      notes: "",
      status: "confirmed",
    },
    {
      id: 3,
      time: "14:00 - 15:30",
      client: "Zeynep Kaya",
      service: "Hair Coloring",
      notes: "Prefers a lighter tone than the previous color",
      status: "pending",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <Button asChild>
            <Link to="/dashboard/appointments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="upcoming">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search appointments..."
                  className="w-full min-w-[260px] pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <TabsContent value="upcoming" className="mt-4">
            <AppointmentsTable />
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-3">
              <Card className="md:col-span-4 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mx-auto"
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-3 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>
                      {date
                        ? format(date, "d MMMM yyyy", { locale: tr })
                        : "Select a date"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appointmentsForDate.length > 0 ? (
                    <div className="space-y-4">
                      {appointmentsForDate.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="rounded-lg border p-3"
                        >
                          <div className="flex justify-between">
                            <div className="font-semibold">
                              {appointment.time}
                            </div>
                            <div className="text-sm">
                              {appointment.status === "confirmed" ? (
                                <span className="text-green-600 font-medium">
                                  Confirmed
                                </span>
                              ) : (
                                <span className="text-amber-600 font-medium">
                                  Pending
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="font-medium">
                              {appointment.client}
                            </div>
                            <div>{appointment.service}</div>
                            {appointment.notes && (
                              <div className="text-muted-foreground mt-1">
                                Notes: {appointment.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No appointments for this date
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-4">
            <AppointmentsTable isPast />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
