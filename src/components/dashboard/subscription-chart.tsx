
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "@/components/dashboard/chart-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const data = [
  { name: "Basic", subscribers: 120 },
  { name: "Pro", subscribers: 240 },
  { name: "Business", subscribers: 180 },
  { name: "Enterprise", subscribers: 60 },
];

export function SubscriptionChart() {
  const chartData = useMemo(() => data, []);

  return (
    <ChartCard 
      title="Subscriptions by Plan" 
      action={
        <Select defaultValue="active">
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="churned">Churned</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              formatter={(value) => [value, 'Subscribers']}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{
                color: 'hsl(var(--foreground))',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}
            />
            <Bar 
              dataKey="subscribers" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
