import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CampaignPerformanceChartProps {
  campaignId?: string;
}

export function CampaignPerformanceChart({
  campaignId,
}: CampaignPerformanceChartProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // This is mock data for demonstration purposes
    const mockData = Array.from({ length: 90 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 90 + i);

      // Create a pattern with higher usage on weekends and a general upward trend
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekMultiplier = isWeekend ? 1.5 : 1;

      // Create a gradual increase in the middle of the campaign
      let trendMultiplier = 1;
      if (i > 30 && i < 60) {
        trendMultiplier = 1 + ((i - 30) / 30) * 0.5;
      } else if (i >= 60) {
        trendMultiplier = 1.5 - ((i - 60) / 30) * 0.3;
      }

      const baseValue = 2 + Math.floor(Math.random() * 3);
      const value = Math.floor(baseValue * weekMultiplier * trendMultiplier);

      return {
        date: date.toLocaleDateString(),
        value,
      };
    });

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
      <LineChart
        data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
      >
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
          tick={{ fontSize: 12 }}
          tickCount={6}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [`${value} usages`, "Usage"]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
