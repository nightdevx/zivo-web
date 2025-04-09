import SidebarNav from "@/components/sidebar-nav";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 ml-0 lg:ml-72">
        <Outlet />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
