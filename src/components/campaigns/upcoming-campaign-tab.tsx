import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import CampaignCard from "./campaign-card";
import { useNavigate } from "@tanstack/react-router";

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
interface UpcomingCampaignTabProps {
  campaigns: Campaign[];
  onCancel: () => void;
}

const UpcomingCampaignTab: React.FC<UpcomingCampaignTabProps> = ({
  campaigns,
  onCancel,
}) => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate({
      to: "/dashboard/campaigns/edit/$id",
      params: { id },
    });
  };
  return (
    <TabsContent value="upcoming" className="mt-4 space-y-4">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.title}
          campaign={campaign}
          onEdit={() => handleEdit(campaign.id || "")}
          onCancel={onCancel}
        />
      ))}
    </TabsContent>
  );
};

export default UpcomingCampaignTab;
