
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, Search, Filter, MoreHorizontal, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Mock data for all projects
const projectsData = [
  {
    id: "1",
    name: "SaaS Platform",
    description: "Customer portal for SaaS subscription management",
  },
  {
    id: "2",
    name: "E-commerce API",
    description: "Payment processing API for e-commerce platform",
  },
  {
    id: "3",
    name: "Mobile App Payments",
    description: "In-app purchase system for mobile application",
  },
  {
    id: "4",
    name: "Membership Site",
    description: "Recurring billing for membership-based website",
  },
];

// Mock data for subscriptions by project
const subscriptionsByProject = {
  "1": [
    {
      id: "101",
      name: "Basic SaaS Plan",
      description: "Entry-level plan for SaaS users",
      price: 29,
      frequency: "monthly",
      status: "active",
      features: ["10 Projects", "5GB Storage", "Basic Support"],
      subscribers: 45,
    },
    {
      id: "102",
      name: "Pro SaaS Plan",
      description: "Advanced features for SaaS professionals",
      price: 99,
      frequency: "monthly",
      status: "active",
      features: ["Unlimited Projects", "20GB Storage", "Priority Support"],
      subscribers: 28,
    }
  ],
  "2": [
    {
      id: "201",
      name: "API Starter",
      description: "Basic API access for e-commerce",
      price: 49,
      frequency: "monthly",
      status: "active",
      features: ["100k API calls", "Basic Analytics", "Email Support"],
      subscribers: 87,
    },
    {
      id: "202",
      name: "API Business",
      description: "Enhanced API access for growing businesses",
      price: 199,
      frequency: "monthly",
      status: "active",
      features: ["1M API calls", "Advanced Analytics", "24/7 Support"],
      subscribers: 55,
    }
  ],
  "3": [
    {
      id: "301",
      name: "Mobile Basic",
      description: "Basic in-app purchase support",
      price: 19,
      frequency: "monthly",
      status: "inactive",
      features: ["Basic Integration", "Standard Support", "Simple Analytics"],
      subscribers: 12,
    }
  ],
  "4": [
    {
      id: "401",
      name: "Membership Lite",
      description: "Basic membership site support",
      price: 39,
      frequency: "monthly",
      status: "active",
      features: ["Member Management", "Basic Billing", "Email Support"],
      subscribers: 45,
    },
    {
      id: "402",
      name: "Membership Pro",
      description: "Advanced membership features",
      price: 129,
      frequency: "monthly",
      status: "active",
      features: ["Unlimited Members", "Advanced Billing", "Priority Support"],
      subscribers: 33,
    }
  ]
};

// Form type
interface SubscriptionFormValues {
  name: string;
  description: string;
  price: number;
  frequency: string;
  features: string;
}

const ProjectSubscriptions = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [projectSubscriptions, setProjectSubscriptions] = useState<any[]>([]);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<SubscriptionFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      frequency: "monthly",
      features: "",
    },
  });

  useEffect(() => {
    // Find project details
    const project = projectsData.find(p => p.id === projectId);
    setProjectDetails(project || null);

    // Get subscriptions for this project
    const subscriptions = subscriptionsByProject[projectId as keyof typeof subscriptionsByProject] || [];
    setProjectSubscriptions(subscriptions);
  }, [projectId]);

  const filteredSubscriptions = projectSubscriptions.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: SubscriptionFormValues) => {
    // Parse features from comma-separated string to array
    const featuresArray = data.features.split(',').map(feature => feature.trim());
    
    // Create new subscription
    const newSubscription = {
      id: `${Date.now()}`,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      frequency: data.frequency,
      status: "active",
      features: featuresArray,
      subscribers: 0
    };
    
    // Add to subscriptions
    setProjectSubscriptions(prev => [...prev, newSubscription]);
    
    // Close dialog and reset form
    setDialogOpen(false);
    form.reset();
  };

  if (!projectDetails) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/projects">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">{projectDetails.name} Subscriptions</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Manage subscription plans for this project
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subscription Plan</DialogTitle>
              <DialogDescription>
                Add a new subscription plan to {projectDetails.name}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Basic Plan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description of the plan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Frequency</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            {...field}
                          >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <Input placeholder="Comma-separated list of features" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter features separated by commas (e.g. "10 Projects, 5GB Storage, Support")
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Create Plan</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
        {filteredSubscriptions.map((plan) => (
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
                {plan.features.map((feature: string, index: number) => (
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

export default ProjectSubscriptions;
