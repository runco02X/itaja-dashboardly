
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, Search, Filter, MoreHorizontal, Download, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Mock subscription data by project
const subscriptionsByProject = {
  "1": [
    { id: "101", name: "Basic SaaS Plan", price: 29 },
    { id: "102", name: "Pro SaaS Plan", price: 99 }
  ],
  "2": [
    { id: "201", name: "API Starter", price: 49 },
    { id: "202", name: "API Business", price: 199 }
  ],
  "3": [
    { id: "301", name: "Mobile Basic", price: 19 }
  ],
  "4": [
    { id: "401", name: "Membership Lite", price: 39 },
    { id: "402", name: "Membership Pro", price: 129 }
  ]
};

// Mock data for clients by project
const clientsByProject = {
  "1": [
    {
      id: "11",
      name: "John Smith",
      email: "john.smith@example.com",
      status: "active",
      plan: "Pro SaaS Plan",
      planId: "102",
      spent: 594,
      lastPayment: "2 days ago",
      avatar: "",
    },
    {
      id: "12",
      name: "Lisa Johnson",
      email: "lisa.johnson@example.com",
      status: "active",
      plan: "Basic SaaS Plan",
      planId: "101",
      spent: 174,
      lastPayment: "1 week ago",
      avatar: "",
    },
  ],
  "2": [
    {
      id: "21",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      status: "active",
      plan: "API Business",
      planId: "202",
      spent: 1194,
      lastPayment: "3 days ago",
      avatar: "",
    },
    {
      id: "22",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      status: "inactive",
      plan: "API Starter",
      planId: "201",
      spent: 245,
      lastPayment: "2 months ago",
      avatar: "",
    },
  ],
  "3": [
    {
      id: "31",
      name: "David Lee",
      email: "david.lee@example.com",
      status: "inactive",
      plan: "Mobile Basic",
      planId: "301",
      spent: 57,
      lastPayment: "3 months ago",
      avatar: "",
    },
  ],
  "4": [
    {
      id: "41",
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      status: "active",
      plan: "Membership Pro",
      planId: "402",
      spent: 774,
      lastPayment: "5 days ago",
      avatar: "",
    },
    {
      id: "42",
      name: "Kevin Brown",
      email: "kevin.brown@example.com",
      status: "active",
      plan: "Membership Lite",
      planId: "401",
      spent: 117,
      lastPayment: "2 weeks ago",
      avatar: "",
    },
  ],
};

// Form type
interface ClientFormValues {
  name: string;
  email: string;
  planId: string;
}

const ProjectClients = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [projectClients, setProjectClients] = useState<any[]>([]);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [projectSubscriptions, setProjectSubscriptions] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<ClientFormValues>({
    defaultValues: {
      name: "",
      email: "",
      planId: "",
    },
  });

  useEffect(() => {
    // Find project details
    const project = projectsData.find(p => p.id === projectId);
    setProjectDetails(project || null);

    // Get clients for this project
    const clients = clientsByProject[projectId as keyof typeof clientsByProject] || [];
    setProjectClients(clients);

    // Get subscriptions for this project (for the dropdown)
    const subscriptions = subscriptionsByProject[projectId as keyof typeof subscriptionsByProject] || [];
    setProjectSubscriptions(subscriptions);
  }, [projectId]);

  const filteredClients = projectClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: ClientFormValues) => {
    // Find the plan details for the selected planId
    const selectedPlan = projectSubscriptions.find(plan => plan.id === data.planId);
    
    // Create new client
    const newClient = {
      id: `${Date.now()}`,
      name: data.name,
      email: data.email,
      status: "active",
      plan: selectedPlan?.name || "Unknown Plan",
      planId: data.planId,
      spent: 0,
      lastPayment: "Just now",
      avatar: "",
    };
    
    // Add to clients
    setProjectClients(prev => [...prev, newClient]);
    
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
            <h1 className="text-3xl font-bold tracking-tight">{projectDetails.name} Clients</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Manage clients for this project
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Add a new client to {projectDetails.name}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="client@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="planId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscription Plan</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            {...field}
                          >
                            <option value="">Select a plan</option>
                            {projectSubscriptions.map(plan => (
                              <option key={plan.id} value={plan.id}>
                                {plan.name} (${plan.price})
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Add Client</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
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

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Last Payment</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {client.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {client.status === "active" ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{client.plan}</TableCell>
                  <TableCell>${client.spent.toLocaleString()}</TableCell>
                  <TableCell>{client.lastPayment}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Payment History</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <User className="h-8 w-8 mb-2" />
                    <p>No clients found for this project.</p>
                    <p className="text-sm">Add a new client to get started.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectClients;
