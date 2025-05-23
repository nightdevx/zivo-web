import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface CampaignServiceBreakdownProps {
  services: string[];
  campaignId?: string;
}

export function CampaignServiceBreakdown({
  services,
  campaignId,
}: CampaignServiceBreakdownProps) {
  const [data, setData] = useState<any[]>([]);

  const COLORS = [
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#bfdbfe",
    "#dbeafe",
  ];

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // This is mock data for demonstration purposes
    const totalUsage = 243; // This should match the campaign's usedCount

    // Create a distribution that adds up to the total usage
    let remaining = totalUsage;
    const mockData = services.map((service, index) => {
      // For the last service, use the remaining amount to ensure the total is correct
      if (index === services.length - 1) {
        return {
          name: service,
          value: remaining,
        };
      }

      // Otherwise, generate a random proportion
      const min = Math.floor(totalUsage * 0.1); // At least 10% of total
      const max = Math.floor(totalUsage * 0.4); // At most 40% of total
      const value = Math.min(
        remaining - (services.length - index - 1) * min,
        min + Math.floor(Math.random() * (max - min))
      );

      remaining -= value;

      return {
        name: service,
        value,
      };
    });

    setData(mockData);
  }, [services, campaignId]);

  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col md:flex-row">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [
              `${value} usages (${((value / 243) * 100).toFixed(1)}%)`,
              "Usage",
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap justify-center gap-2 md:mt-0 md:flex-col md:justify-center">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs font-medium">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
