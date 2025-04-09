"use client";

import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  FileImage,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Scissors,
  Users,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/auth";

const SidebarNav = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Define the routes for the sidebar navigation
  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard/",
    },
    {
      label: "Appointments",
      icon: Calendar,
      href: "/dashboard/appointments",
    },
    {
      label: "Campaigns",
      icon: Users,
      href: "/dashboard/campaigns",
    },
    {
      label: "Services",
      icon: Scissors,
      href: "/dashboard/services",
    },
    {
      label: "Gallery",
      icon: FileImage,
      href: "/dashboard/gallery",
    },
    {
      label: "Working Hours",
      icon: Clock,
      href: "/dashboard/hours",
    },
    {
      label: "Employees",
      icon: Users,
      href: "/dashboard/employees",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
    },
    {
      label: "Profile",
      icon: UserCircle,
      href: "/dashboard/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <>
      <div className="hidden border-r bg-background lg:fixed lg:z-10 lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Scissors className="h-6 w-6" />
            <span className="text-xl">Beauty Manager</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === route.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              auth.logout().then(() => {
                navigate({ to: "/login" });
              });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 lg:hidden"
          >
            <Scissors className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-16 items-center border-b px-6">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold"
              onClick={() => setOpen(false)}
            >
              <Scissors className="h-6 w-6" />
              <span className="text-xl">Beauty Manager</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === route.href
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="border-t p-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {}}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SidebarNav;
