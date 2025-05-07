import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Download, Share2, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignPerformanceChart } from "@/components/campaigns/performance-chart";
import { CampaignServiceBreakdown } from "@/components/campaigns/service-breakdown";
import { CampaignComparisonChart } from "@/components/campaigns/comparison-chart";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/campaigns/report/$id")({
  component: CampaignReportPage,
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

export default function CampaignReportPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setTimeout(() => {
      setCampaign({
        id: "",
        title: "Summer Special Discount",
        description: "20% off on all beauty services for the summer season",
        validUntil: "2023-08-31",
        daysLeft: 0,
        services: "Haircut, Manicure, Pedicure, Facial",
        usedCount: 243,
        progress: 81,
        type: "past",
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">
            Loading campaign report...
          </p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg font-medium">Campaign not found</p>
          <Link
            to="/dashboard/campaigns"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Return to campaigns
          </Link>
        </div>
      </div>
    );
  }

  const campaignStartDate = new Date(
    new Date(campaign.validUntil).getTime() - 90 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();
  const campaignEndDate = new Date(campaign.validUntil).toLocaleDateString();

  // Calculate some metrics for the report
  const targetUsage = 300; // Example target
  const achievementPercentage = Math.round(
    (campaign.usedCount / targetUsage) * 100
  );
  const servicesArray = campaign.services.split(", ");

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/dashboard/campaigns">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold md:text-3xl">Campaign Report</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">{campaign.title}</h2>
              <p className="mt-2 text-muted-foreground">
                {campaign.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {campaignStartDate} - {campaignEndDate}
                </span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaign.usedCount}</div>
                  <p className="text-xs text-muted-foreground">
                    out of target {targetUsage}
                  </p>
                  <Progress
                    value={achievementPercentage}
                    className="mt-2 h-2"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaign.progress}%</div>
                  <p className="text-xs text-muted-foreground">
                    of campaign goal
                  </p>
                  <Progress value={campaign.progress} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>
                  Daily usage of the campaign during its active period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CampaignPerformanceChart campaignId={campaign.id} />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-4">
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Total Usage
                      </dt>
                      <dd className="text-sm font-semibold">
                        {campaign.usedCount}
                      </dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Achievement
                      </dt>
                      <dd className="text-sm font-semibold">
                        {achievementPercentage}%
                      </dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Duration
                      </dt>
                      <dd className="text-sm font-semibold">90 days</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Avg. Daily Usage
                      </dt>
                      <dd className="text-sm font-semibold">
                        {Math.round(campaign.usedCount / 90)}
                      </dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Peak Usage Day
                      </dt>
                      <dd className="text-sm font-semibold">
                        July 15, 2023 (18)
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Demographics</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="text-center">
                    <Users className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Demographics data visualization would appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Breakdown</CardTitle>
                <CardDescription>
                  Usage distribution across different services
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CampaignServiceBreakdown
                  services={servicesArray}
                  campaignId={campaign.id}
                />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-3">
              {servicesArray.map((service, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {service}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {/* Mock data for demonstration */}
                      {Math.floor(
                        (campaign.usedCount / servicesArray.length) *
                          (1 + Math.random() * 0.5)
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">usages</p>
                    <Progress
                      value={Math.floor(Math.random() * 100)}
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Comparison</CardTitle>
                <CardDescription>
                  How this campaign performed compared to previous ones
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CampaignComparisonChart campaignId={campaign.id} />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Ranking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Spring Sale 2023
                      </span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Summer Special (Current)
                      </span>
                      <span className="text-sm font-semibold">
                        {campaign.progress}%
                      </span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Winter Promotion 2022
                      </span>
                      <span className="text-sm font-semibold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Fall Collection 2022
                      </span>
                      <span className="text-sm font-semibold">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Insights & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></span>
                      <span>
                        This campaign performed <strong>27% better</strong> than
                        the average of past campaigns.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></span>
                      <span>
                        <strong>Haircut</strong> was the most popular service,
                        accounting for <strong>35%</strong> of all usages.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>
                        <strong>Weekends</strong> saw 2.5x more usage than
                        weekdays, consider extending weekend hours for future
                        campaigns.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></span>
                      <span>
                        <strong>Facial</strong> services underperformed by{" "}
                        <strong>18%</strong> compared to projections.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>
                        <strong>Recommendation:</strong> For the next campaign,
                        focus on facial services with a higher discount rate.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
