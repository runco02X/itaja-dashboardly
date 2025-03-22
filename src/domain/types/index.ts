
export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  clients: number;
  subscriptions: number;
  date: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  plan: string;
  planId: string;
  spent: number;
  lastPayment: string;
  avatar: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  description?: string;
  frequency?: string;
  features?: string[];
  subscribers?: number;
}

export interface Payment {
  id: string;
  client: string;
  plan: string;
  amount: number;
  status: "successful" | "failed" | "pending";
  method: string;
  date: string;
  projectId: string;
  projectName: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  read: boolean;
  date: string;
  projectId: string | null;
  projectName: string | null;
}

export type ClientFormValues = {
  name: string;
  email: string;
  planId: string;
};
