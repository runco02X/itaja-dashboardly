
import { TrendingUp, Users, Activity, ArrowDownRight, CreditCard } from "lucide-react";
import { StatisticCard } from "@/components/dashboard/statistic-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SubscriptionChart } from "@/components/dashboard/subscription-chart";
import { RecentActivities } from "@/components/dashboard/recent-activities";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your subscription analytics and activity
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          title="Monthly Recurring Revenue"
          value="$24,983"
          icon={<TrendingUp className="h-4 w-4" />}
          description="vs last month"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatisticCard
          title="Active Subscriptions"
          value="621"
          icon={<Users className="h-4 w-4" />}
          description="vs last month"
          trend={{ value: 4.2, isPositive: true }}
        />
        <StatisticCard
          title="Churn Rate"
          value="3.2%"
          icon={<ArrowDownRight className="h-4 w-4" />}
          description="vs last month"
          trend={{ value: 0.5, isPositive: false }}
        />
        <StatisticCard
          title="Total Transactions"
          value="$124,763"
          icon={<CreditCard className="h-4 w-4" />}
          description="vs last month"
          trend={{ value: 8.3, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <SubscriptionChart />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
