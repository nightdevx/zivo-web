import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RecentCampaignsProps {
  className?: string;
}

export function RecentCampaigns({ className }: RecentCampaignsProps) {
  const campaigns = [
    {
      id: 1,
      name: "Summer Special: 20% Off Hair Coloring",
      progress: 65,
      status: "active",
      daysLeft: 15,
    },
    {
      id: 2,
      name: "New Client Package: Free Consultation",
      progress: 100,
      status: "completed",
      daysLeft: 0,
    },
    {
      id: 3,
      name: "Refer a Friend: Both Get 15% Off",
      progress: 30,
      status: "active",
      daysLeft: 25,
    },
  ];

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Active Campaigns</CardTitle>
        <CardDescription>Current promotions and offers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{campaign.name}</div>
                {campaign.status === "active" ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">
                    {campaign.daysLeft} days left
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-0"
                  >
                    Completed
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Progress value={campaign.progress} className="h-2" />
                <span className="text-sm text-muted-foreground">
                  {campaign.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
