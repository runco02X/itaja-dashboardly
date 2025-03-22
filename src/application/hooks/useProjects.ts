
import { useState } from "react";
import { Project } from "@/domain/types";

// Initial mock data
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

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const getFilteredProjects = (searchTerm: string) => {
    return projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getProjectById = (projectId: string | undefined) => {
    if (!projectId) return null;
    return projects.find(p => p.id === projectId) || null;
  };

  return {
    projects,
    setProjects,
    getFilteredProjects,
    getProjectById,
  };
};
