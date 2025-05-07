import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

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

interface CampaignCardProps {
  campaign: Campaign;
  onEdit?: (campaign: Campaign) => void;
  onEnd?: (campaign: Campaign) => void;
  onViewReport?: (campaign: Campaign) => void;
  onReactivate?: (campaign: Campaign) => void;
  onCancel?: (campaign: Campaign) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  onEnd,
  onViewReport,
  onReactivate,
  onCancel,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{campaign.title}</CardTitle>
            <CardDescription>
              Valid until: {campaign.validUntil}
            </CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
            {campaign.daysLeft} days left
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-medium">Services:</span> {campaign.services}
            </div>
            <div>
              <span className="font-medium">Used:</span> {campaign.usedCount}{" "}
              times
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Campaign progress</span>
              <span>{campaign.progress}%</span>
            </div>
            <Progress value={campaign.progress} className="h-2" />
          </div>
          <div className="flex justify-end gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(campaign)}
              >
                Edit
              </Button>
            )}
            {onEnd && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onEnd(campaign)}
              >
                End Campaign
              </Button>
            )}

            {onViewReport && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewReport(campaign)}
              >
                View Report
              </Button>
            )}
            {onReactivate && (
              <Button size="sm" onClick={() => onReactivate(campaign)}>
                Reactivate
              </Button>
            )}

            {onCancel && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(campaign)}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
