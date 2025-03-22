
import { useState } from "react";
import { Payment } from "@/domain/types";

// Mock data
const initialPayments = [
  {
    id: "INV-001",
    client: "John Smith",
    plan: "Pro Plan",
    amount: 99.00,
    status: "successful",
    method: "Credit Card",
    date: "Jul 14, 2023",
    projectId: "proj-001",
    projectName: "Website Redesign"
  },
  {
    id: "INV-002",
    client: "Jane Cooper",
    plan: "Team Plan",
    amount: 249.00,
    status: "successful",
    method: "PayPal",
    date: "Jul 12, 2023",
    projectId: "proj-002",
    projectName: "Mobile App"
  },
  {
    id: "INV-003",
    client: "Robert Johnson",
    plan: "Basic Plan",
    amount: 29.00,
    status: "failed",
    method: "Credit Card",
    date: "Jul 10, 2023",
    projectId: "proj-001",
    projectName: "Website Redesign"
  },
  {
    id: "INV-004",
    client: "Emily Davis",
    plan: "Enterprise Plan",
    amount: 999.00,
    status: "successful",
    method: "Bank Transfer",
    date: "Jul 05, 2023",
    projectId: "proj-003",
    projectName: "E-commerce Platform"
  },
  {
    id: "INV-005",
    client: "Michael Wilson",
    plan: "Pro Plan",
    amount: 99.00,
    status: "pending",
    method: "Credit Card",
    date: "Jul 01, 2023",
    projectId: "proj-002",
    projectName: "Mobile App"
  },
  {
    id: "INV-006",
    client: "Sarah Johnson",
    plan: "Team Plan",
    amount: 249.00,
    status: "successful",
    method: "PayPal",
    date: "Jun 28, 2023",
    projectId: "proj-001",
    projectName: "Website Redesign"
  },
  {
    id: "INV-007",
    client: "James Brown",
    plan: "Basic Plan",
    amount: 29.00,
    status: "failed",
    method: "Credit Card",
    date: "Jun 25, 2023",
    projectId: "proj-003",
    projectName: "E-commerce Platform"
  },
  {
    id: "INV-008",
    client: "Jennifer Wilson",
    plan: "Pro Plan",
    amount: 99.00,
    status: "successful",
    method: "PayPal",
    date: "Jun 20, 2023",
    projectId: "proj-002",
    projectName: "Mobile App"
  },
] as Payment[];

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  const getFilteredPayments = (searchTerm: string) => {
    return payments.filter(payment => 
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    payments,
    setPayments,
    getFilteredPayments,
  };
};
