import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardStats } from "../../components/dashboard-stats";
import { UpcomingAppointments } from "../../components/upcoming-appointments";
import { RecentCampaigns } from "../../components/recent-campaigns";
import { Button } from "../../components/ui/button";
import { Calendar, Clock, FileImage, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Salon Dashboard</h1>
          <Button asChild size="sm" className="ml-auto">
            <Link to="/dashboard/appointments/new">
              <Calendar className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </div>

        <DashboardStats />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <UpcomingAppointments className="lg:col-span-4" />
          <RecentCampaigns className="lg:col-span-3" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/dashboard/appointments"
            className="flex flex-col items-center justify-center rounded-lg border border-muted bg-card p-8 text-card-foreground shadow transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Calendar className="mb-2 h-8 w-8" />
            <h3 className="text-lg font-medium">Appointments</h3>
            <p className="text-sm text-muted-foreground">
              Manage all appointments
            </p>
          </Link>
          <Link
            to="/dashboard/campaigns"
            className="flex flex-col items-center justify-center rounded-lg border border-muted bg-card p-8 text-card-foreground shadow transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="mb-2 h-8 w-8" />
            <h3 className="text-lg font-medium">Campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Create special offers
            </p>
          </Link>
          <Link
            to="/dashboard/services"
            className="flex flex-col items-center justify-center rounded-lg border border-muted bg-card p-8 text-card-foreground shadow transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Clock className="mb-2 h-8 w-8" />
            <h3 className="text-lg font-medium">Services</h3>
            <p className="text-sm text-muted-foreground">
              Manage service offerings
            </p>
          </Link>
          <Link
            to="/dashboard/gallery"
            className="flex flex-col items-center justify-center rounded-lg border border-muted bg-card p-8 text-card-foreground shadow transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <FileImage className="mb-2 h-8 w-8" />
            <h3 className="text-lg font-medium">Gallery</h3>
            <p className="text-sm text-muted-foreground">Showcase your work</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
