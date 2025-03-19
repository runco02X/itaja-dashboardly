
import React, { createContext, useContext, ReactNode } from 'react';

// Mock data
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

interface ProjectDataContextType {
  projectsData: typeof projectsData;
  subscriptionsByProject: typeof subscriptionsByProject;
  clientsByProject: typeof clientsByProject;
}

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined);

export function ProjectDataProvider({ children }: { children: ReactNode }) {
  return (
    <ProjectDataContext.Provider value={{ 
      projectsData, 
      subscriptionsByProject, 
      clientsByProject 
    }}>
      {children}
    </ProjectDataContext.Provider>
  );
}

export function useProjectData() {
  const context = useContext(ProjectDataContext);
  if (context === undefined) {
    throw new Error('useProjectData must be used within a ProjectDataProvider');
  }
  return context;
}
