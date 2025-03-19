import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Types
interface Project {
  id: string;
  name: string;
  description: string;
}

interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
  features: string[];
  status: string;
  subscribers: number;
}
import { useTranslation } from "@/hooks/useTranslation";
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
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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

interface SubscriptionFormValues {
  name: string;
  description: string;
  price: number;
  frequency: string;
  features: string;
}

const ProjectSubscriptions = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [projectSubscriptions, setProjectSubscriptions] = useState<Subscription[]>([]);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
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
    const project = projectsData.find(p => p.id === projectId);
    setProjectDetails(project || null);

    const subscriptions = subscriptionsByProject[projectId as keyof typeof subscriptionsByProject] || [];
    setProjectSubscriptions(subscriptions);
  }, [projectId]);

  const filteredSubscriptions = projectSubscriptions.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackClick = () => {
    navigate(`/projects/${projectId}`);
    toast({
      title: t('returningToProject'),
      description: projectDetails?.name || t('project'),
    });
  };

  const onSubmit = (data: SubscriptionFormValues) => {
    const featuresArray = data.features.split(',').map(feature => feature.trim());
    
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
    
    setProjectSubscriptions(prev => [...prev, newSubscription]);
    
    setDialogOpen(false);
    form.reset();
  };

  if (!projectDetails) {
    return <div>{t('projectNotFound')}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 group relative overflow-hidden hover:bg-transparent" 
              onClick={handleBackClick}
            >
              <span className="absolute inset-0 bg-primary-foreground/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <ArrowLeft className="h-4 w-4 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-primary transition-colors">{t('back')}</span>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{projectDetails.name} {t('subscriptions')}</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            {t('manageSubscriptions')}
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto group relative overflow-hidden">
              <span className="absolute inset-0 bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-all duration-300"></span>
              <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
              <span className="relative z-10">{t('newPlan')}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('createNewSubscription')}</DialogTitle>
              <DialogDescription>
                {t('addSubscriptionTo')} {projectDetails.name}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('planName')}</FormLabel>
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
                      <FormLabel>{t('description')}</FormLabel>
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
                        <FormLabel>{t('price')}</FormLabel>
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
                        <FormLabel>{t('frequency')}</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            {...field}
                          >
                            <option value="monthly">{t('monthly')}</option>
                            <option value="quarterly">{t('quarterly')}</option>
                            <option value="yearly">{t('yearly')}</option>
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
                      <FormLabel>{t('features')}</FormLabel>
                      <FormControl>
                        <Input placeholder="Comma-separated list of features" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t('enterFeatures')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{t('newPlan')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 sm:flex-row"
      >
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchPlans')}
            className="w-full pl-8 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 shrink-0 hover:bg-primary/5 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span className="sr-only">{t('filter')}</span>
        </Button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredSubscriptions.map((plan) => (
          <motion.div
            key={plan.id}
            variants={itemVariants}
            whileHover="hover"
          >
            <Card className={cn(
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
                  <span className="sr-only">{t('actions')}</span>
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
                  <span className="text-muted-foreground">/{t(plan.frequency as 'monthly' | 'yearly' | 'quarterly')}</span>
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
                      {plan.status === "active" ? t('active') : t('inactive')}
                    </Badge>
                  </div>
                  <div>
                    {plan.subscribers} {t('subscribers')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectSubscriptions;
