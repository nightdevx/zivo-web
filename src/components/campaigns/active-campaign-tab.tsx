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

interface ActiveCampaignTabProps {
  campaigns: Campaign[];
  onEnd: (campaign: Campaign) => void;
}

const ActiveCampaignTab: React.FC<ActiveCampaignTabProps> = ({
  campaigns,
  onEnd,
}) => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate({
      to: "/dashboard/campaigns/edit/$id",
      params: { id },
    });
  };

  return (
    <TabsContent value="active" className="mt-4 space-y-4">
      {campaigns.map((campaign, index) => (
        <CampaignCard
          key={index}
          campaign={campaign}
          onEdit={() => handleEdit(campaign.id || "")}
          onEnd={() => onEnd(campaign)}
        />
      ))}
    </TabsContent>
  );
};

export default ActiveCampaignTab;
