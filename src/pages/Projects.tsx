
import { Plus, MoreHorizontal, Folder, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
const initialProjects = [
  {
    id: "1",
    name: "SaaS Platform",
    description: "Customer portal for SaaS subscription management",
    status: "active",
    clients: 45,
    subscriptions: 38,
    date: "Mar 14, 2023",
  },
  {
    id: "2",
    name: "E-commerce API",
    description: "Payment processing API for e-commerce platform",
    status: "active",
    clients: 157,
    subscriptions: 142,
    date: "Jan 22, 2023",
  },
  {
    id: "3",
    name: "Mobile App Payments",
    description: "In-app purchase system for mobile application",
    status: "inactive",
    clients: 12,
    subscriptions: 8,
    date: "Sep 05, 2022",
  },
  {
    id: "4",
    name: "Membership Site",
    description: "Recurring billing for membership-based website",
    status: "active",
    clients: 78,
    subscriptions: 65,
    date: "Nov 18, 2022",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your payment projects and their subscriptions
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search projects..."
          className="w-full sm:max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className={cn(
            "transition-all hover:shadow-md",
            project.status === "inactive" && "opacity-70"
          )}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    <Folder className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2 h-10">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant={project.status === "active" ? "default" : "secondary"}>
                  {project.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{project.clients} clients</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{project.date}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
