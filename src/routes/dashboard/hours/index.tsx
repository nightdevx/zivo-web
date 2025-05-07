import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ScheduleTab from "@/components/hours/schedule-tab";
import HolidaysTab from "@/components/hours/holidays-tab";

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
            <TabsTrigger value="holidays">Holidays & Time Off</TabsTrigger>
          </TabsList>

          <ScheduleTab
            workingDays={workingDays}
            setWorkingDays={setWorkingDays}
          />

          <HolidaysTab />
        </Tabs>
      </main>
    </div>
  );
}
