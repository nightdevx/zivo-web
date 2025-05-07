import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import CampaignCard from "./campaign-card";

interface Campaign {
  title: string;
  description: string;
  validUntil: string;
  daysLeft: number;
  services: string;
  usedCount: number;
  progress: number;
  type: "active" | "upcoming" | "past";
}

interface PastCampaignTabProps {
  campaigns: Campaign[];
  onViewReport: (campaign: Campaign) => void;
  onReactivate: (campaign: Campaign) => void;
}

const PastCampaignTab: React.FC<PastCampaignTabProps> = ({
  campaigns,
  onViewReport,
  onReactivate,
}) => {
  return (
    <TabsContent value="past" className="mt-4 space-y-4">
      {campaigns.map((campaign) => (
        // <Card key={campaign.title}>
        //   <CardHeader>
        //     <div className="flex items-center justify-between">
        //       <div>
        //         <CardTitle>{campaign.title}</CardTitle>
        //         <CardDescription>Ended: {campaign.validUntil}</CardDescription>
        //       </div>
        //       <Badge
        //         variant="outline"
        //         className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-0"
        //       >
        //         Completed
        //       </Badge>
        //     </div>
        //   </CardHeader>
        //   <CardContent>
        //     <div className="space-y-4">
        //       <div className="flex justify-between text-sm">
        //         <div>
        //           <span className="font-medium">Services:</span>{" "}
        //           {campaign.services}
        //         </div>
        //         <div>
        //           <span className="font-medium">Used:</span>{" "}
        //           {campaign.usedCount} times
        //         </div>
        //       </div>
        //       <div className="space-y-1">
        //         <div className="flex justify-between text-sm">
        //           <span>Campaign results</span>
        //           <span>{campaign.progress}%</span>
        //         </div>
        //         <Progress value={campaign.progress} className="h-2" />
        //       </div>
        //       <div className="flex justify-end gap-2">
        //         <Button
        //           variant="outline"
        //           size="sm"
        //           onClick={() => onViewReport(campaign)}
        //         >
        //           View Report
        //         </Button>
        //         <Button size="sm" onClick={() => onReactivate(campaign)}>
        //           Reactivate
        //         </Button>
        //       </div>
        //     </div>
        //   </CardContent>
        // </Card>

        <CampaignCard
          key={campaign.title}
          campaign={campaign}
          onViewReport={onViewReport}
          onReactivate={onReactivate}
        />
      ))}
    </TabsContent>
  );
};

export default PastCampaignTab;
