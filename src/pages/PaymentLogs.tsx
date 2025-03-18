
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Download, CheckCircle, XCircle, DollarSign, Calendar, AlertTriangle } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
  },
  {
    id: "INV-002",
    client: "Jane Cooper",
    plan: "Team Plan",
    amount: 249.00,
    status: "successful",
    method: "PayPal",
    date: "Jul 12, 2023",
  },
  {
    id: "INV-003",
    client: "Robert Johnson",
    plan: "Basic Plan",
    amount: 29.00,
    status: "failed",
    method: "Credit Card",
    date: "Jul 10, 2023",
  },
  {
    id: "INV-004",
    client: "Emily Davis",
    plan: "Enterprise Plan",
    amount: 999.00,
    status: "successful",
    method: "Bank Transfer",
    date: "Jul 05, 2023",
  },
  {
    id: "INV-005",
    client: "Michael Wilson",
    plan: "Pro Plan",
    amount: 99.00,
    status: "pending",
    method: "Credit Card",
    date: "Jul 01, 2023",
  },
  {
    id: "INV-006",
    client: "Sarah Johnson",
    plan: "Team Plan",
    amount: 249.00,
    status: "successful",
    method: "PayPal",
    date: "Jun 28, 2023",
  },
  {
    id: "INV-007",
    client: "James Brown",
    plan: "Basic Plan",
    amount: 29.00,
    status: "failed",
    method: "Credit Card",
    date: "Jun 25, 2023",
  },
  {
    id: "INV-008",
    client: "Jennifer Wilson",
    plan: "Pro Plan",
    amount: 99.00,
    status: "successful",
    method: "PayPal",
    date: "Jun 20, 2023",
  },
];

const PaymentLogs = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter(payment => 
    payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Logs</h1>
          <p className="text-muted-foreground">
            View and manage all payments and transactions
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
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
              <TableHead>Invoice ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.client}</TableCell>
                <TableCell>{payment.plan}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {payment.status === "successful" ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Successful
                      </Badge>
                    ) : payment.status === "failed" ? (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        <XCircle className="mr-1 h-3 w-3" />
                        Failed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.date}</TableCell>
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
                      <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                      <DropdownMenuItem>Contact Client</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentLogs;
