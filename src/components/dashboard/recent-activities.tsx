
import { useMemo } from "react";
import { Activity } from "lucide-react";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "subscription" | "payment" | "client" | "api";
  title: string;
  description: string;
  time: string;
}

// Mock data
const activities: ActivityItem[] = [
  {
    id: "1",
    type: "subscription",
    title: "New subscription",
    description: "Client John Smith subscribed to Pro Plan",
    time: "10 minutes ago",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment received",
    description: "$199.00 payment received from Client #4921",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "client",
    title: "New client registered",
    description: "Jane Cooper registered as a new client",
    time: "3 hours ago",
  },
  {
    id: "4",
    type: "payment",
    title: "Payment failed",
    description: "Payment for Client #3921 failed. Card declined.",
    time: "5 hours ago",
  },
  {
    id: "5",
    type: "api",
    title: "API key generated",
    description: "New API key generated for Project X",
    time: "Yesterday",
  },
];

export function RecentActivities() {
  const activityData = useMemo(() => activities, []);

  return (
    <ChartCard 
      title="Recent Activities" 
      action={<Button size="sm" variant="ghost">View all</Button>}
    >
      <div className="divide-y divide-border">
        {activityData.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-4">
            <div 
              className={cn(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                activity.type === "subscription" && "bg-primary/10 text-primary",
                activity.type === "payment" && "bg-success/10 text-success",
                activity.type === "client" && "bg-info/10 text-info",
                activity.type === "api" && "bg-warning/10 text-warning"
              )}
            >
              <Activity className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
