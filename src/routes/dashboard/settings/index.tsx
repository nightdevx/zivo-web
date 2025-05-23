import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import GeneralTab from "@/components/settings/general-tab";
import NotificationsTab from "@/components/settings/notifications-tab";
import SecurityTab from "@/components/settings/security-tab";
import IntegrationsTab from "@/components/settings/integrations-tab";

export const Route = createFileRoute("/dashboard/settings/")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <GeneralTab />
          <NotificationsTab />
          <SecurityTab />
          <IntegrationsTab />
        </Tabs>
      </main>
    </div>
  );
}
