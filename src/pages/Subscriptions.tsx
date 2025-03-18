
import { Plus, Search, Filter, MoreHorizontal, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock data
const initialPlans = [
  {
    id: "1",
    name: "Basic Plan",
    description: "Entry-level plan for individuals",
    price: 29,
    frequency: "monthly",
    status: "active",
    features: ["10 Projects", "5GB Storage", "Basic Support"],
    subscribers: 245,
  },
  {
    id: "2",
    name: "Pro Plan",
    description: "Advanced features for professionals",
    price: 99,
    frequency: "monthly",
    status: "active",
    features: ["Unlimited Projects", "20GB Storage", "Priority Support", "API Access"],
    subscribers: 187,
  },
  {
    id: "3",
    name: "Team Plan",
    description: "Collaboration features for teams",
    price: 249,
    frequency: "monthly",
    status: "active",
    features: ["Unlimited Projects", "50GB Storage", "24/7 Support", "API Access", "Team Management"],
    subscribers: 76,
  },
  {
    id: "4",
    name: "Enterprise Plan",
    description: "Custom solutions for large organizations",
    price: 999,
    frequency: "monthly",
    status: "inactive",
    features: ["Custom Features", "Unlimited Storage", "Dedicated Support", "Custom API Limits"],
    subscribers: 12,
  },
];

const Subscriptions = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and pricing
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Plan
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search plans..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className={cn(
            "flex flex-col transition-all hover:shadow-md",
            plan.status === "inactive" && "opacity-70"
          )}>
            <CardHeader className="pb-2 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4 h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-primary/10 p-2 text-primary">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="line-clamp-2 h-10">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.frequency}</span>
              </div>
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-4 flex justify-between items-center text-xs text-muted-foreground border-t">
                <div className="flex items-center gap-1">
                  <Badge variant={plan.status === "active" ? "default" : "secondary"}>
                    {plan.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  {plan.subscribers} subscribers
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
