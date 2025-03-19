
import { Plus, MoreHorizontal, Folder, Calendar, User, CreditCard } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('projectsTitle')}</h1>
          <p className="text-muted-foreground">
            {t('projectsSubtitle')}
          </p>
        </div>
        <Button className="w-full sm:w-auto group relative overflow-hidden">
          <span className="absolute inset-0 bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-all duration-300"></span>
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
          <span className="relative z-10">{t('newProject')}</span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <Input
          placeholder={t('searchProjects')}
          className="w-full sm:max-w-xs focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <motion.div 
            key={project.id}
            variants={itemVariants}
            whileHover="hover"
          >
            <Card 
              className={cn(
                "transition-all hover:shadow-md cursor-pointer border-2 border-transparent hover:border-primary/10",
                project.status === "inactive" && "opacity-70"
              )}
              onClick={() => handleProjectClick(project.id)}
            >
              <CardHeader className="pb-2 group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-2 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      <Folder className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors duration-300">{project.name}</CardTitle>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">{t('actions')}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()} className="animate-in slide-in-from-top-2 fade-in-80">
                      <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('viewDetails')}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {t('delete')}
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
                  <Badge variant={project.status === "active" ? "default" : "secondary"} className="animate-pulse-slow">
                    {project.status === "active" ? t('active') : t('inactive')}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 border-t pt-4">
                <div className="flex w-full justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1 group">
                    <User className="h-3 w-3 group-hover:text-primary transition-colors" />
                    <span className="group-hover:text-primary transition-colors">{project.clients} {t('clients')}</span>
                  </div>
                  <div className="flex items-center gap-1 group">
                    <Calendar className="h-3 w-3 group-hover:text-primary transition-colors" />
                    <span className="group-hover:text-primary transition-colors">{project.date}</span>
                  </div>
                </div>
                <div className="flex justify-between w-full gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground group">
                    <CreditCard className="h-3 w-3 group-hover:text-primary transition-colors" />
                    <span className="group-hover:text-primary transition-colors">{project.subscriptions} {t('subscriptions')}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
