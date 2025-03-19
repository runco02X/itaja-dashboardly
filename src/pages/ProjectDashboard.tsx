
import { TrendingUp, Users, Activity, ArrowDownRight, CreditCard, ArrowLeft } from "lucide-react";
import { StatisticCard } from "@/components/dashboard/statistic-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SubscriptionChart } from "@/components/dashboard/subscription-chart";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";

const ProjectDashboard = () => {
  const { projectId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Mock project data based on ID
  const getProjectName = () => {
    switch(projectId) {
      case "1": return "SaaS Platform";
      case "2": return "E-commerce API";
      case "3": return "Mobile App Payments";
      case "4": return "Membership Site";
      default: return `Project ${projectId}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/projects')} 
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')} {t('projects')}
        </Button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getProjectName()}</h1>
          <p className="text-muted-foreground">
            Analytics and overview of your project performance
          </p>
        </div>
        <div className="flex gap-2">
          <Link to={`/projects/${projectId}/clients`}>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Clients
            </Button>
          </Link>
          <Link to={`/projects/${projectId}/subscriptions`}>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Subscriptions
            </Button>
          </Link>
        </div>
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

export default ProjectDashboard;
