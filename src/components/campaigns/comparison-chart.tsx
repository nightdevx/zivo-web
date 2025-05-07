import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CampaignComparisonChartProps {
  campaignId?: string;
}

export function CampaignComparisonChart({
  campaignId,
}: CampaignComparisonChartProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // This is mock data for demonstration purposes
    const mockData = [
      {
        name: "Winter 2022",
        usage: 198,
        target: 250,
      },
      {
        name: "Spring 2023",
        usage: 276,
        target: 300,
      },
      {
        name: "Summer 2023",
        usage: 243,
        target: 300,
        current: true,
      },
      {
        name: "Fall 2023",
        usage: 0,
        target: 325,
        upcoming: true,
      },
    ];

    setData(mockData);
  }, [campaignId]);

  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value: number, name: string) => [
            `${value}`,
            name === "usage" ? "Actual Usage" : "Target",
          ]}
        />
        <Bar
          dataKey="target"
          fill="#e5e7eb"
          radius={[4, 4, 0, 0]}
          name="Target"
        />
        <Bar
          dataKey="usage"
          fill="#2563eb"
          radius={[4, 4, 0, 0]}
          name="Actual Usage"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
