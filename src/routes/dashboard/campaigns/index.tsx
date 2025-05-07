import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import ActiveCampaignTab from "@/components/campaigns/active-campaign-tab";
import { useState } from "react";
import UpcomingCampaignTab from "@/components/campaigns/upcoming-campaign-tab";
import PastCampaignTab from "@/components/campaigns/past-campaign-tab";

export const Route = createFileRoute("/dashboard/campaigns/")({
  component: CampaignsPage,
});
interface Campaign {
  id?: string;
  title: string;
  description: string;
  validUntil: string;
  daysLeft: number;
  services: string;
  usedCount: number;
  progress: number;
  type: "active" | "upcoming" | "past";
}

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Summer Special: 20% Off Hair Coloring",
      description: "Valid until: 30 Nisan 2025",
      validUntil: "30 Nisan 2025",
      daysLeft: 15,
      services: "Hair Coloring",
      usedCount: 65,
      progress: 65,
      type: "active",
    },
    {
      id: "2",
      title: "Refer a Friend: Both Get 15% Off",
      description: "Valid until: 10 Mayıs 2025",
      validUntil: "10 Mayıs 2025",
      daysLeft: 25,
      services: "All Services",
      usedCount: 30,
      progress: 30,
      type: "active",
    },
    {
      id: "3",
      title: "Spring Manicure Special",
      description: "Starts: 1 Mayıs 2025",
      validUntil: "1 Mayıs 2025",
      daysLeft: 15,
      services: "Manicure, Pedicure",
      usedCount: 0,
      progress: 0,
      type: "upcoming",
    },
    {
      id: "4",
      title: "New Client Package: Free Consultation",
      description: "Ended: 1 Nisan 2025",
      validUntil: "1 Nisan 2025",
      daysLeft: 0,
      services: "All Services",
      usedCount: 120,
      progress: 100,
      type: "past",
    },
  ]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <Button asChild>
            <Link to="/dashboard/campaigns/new">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
              className="pl-8"
            />
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <ActiveCampaignTab
            campaigns={campaigns.filter(
              (campaign) => campaign.type === "active"
            )}
            onEnd={() => {}}
          />

          <UpcomingCampaignTab
            campaigns={campaigns.filter(
              (campaign) => campaign.type === "upcoming"
            )}
            onCancel={() => {}}
          />

          <PastCampaignTab
            campaigns={campaigns.filter((campaign) => campaign.type === "past")}
            onViewReport={() => {}}
            onReactivate={() => {}}
          />
        </Tabs>
      </main>
    </div>
  );
}
