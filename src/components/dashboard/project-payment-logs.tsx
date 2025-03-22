
import { useState } from "react";
import { Download, CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/chart-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

// Mock data - typically this would come from an API call
const paymentLogs = [
  {
    id: "INV-001",
    client: "John Smith",
    plan: "Pro Plan",
    amount: 99.00,
    status: "successful",
    date: "Jul 14, 2023",
  },
  {
    id: "INV-002",
    client: "Jane Cooper",
    plan: "Team Plan",
    amount: 249.00,
    status: "successful",
    date: "Jul 12, 2023",
  },
  {
    id: "INV-003",
    client: "Robert Johnson",
    plan: "Basic Plan",
    amount: 29.00,
    status: "failed",
    date: "Jul 10, 2023",
  },
  {
    id: "INV-004",
    client: "Emily Davis",
    plan: "Enterprise Plan",
    amount: 999.00,
    status: "pending",
    date: "Jul 05, 2023",
  },
];

interface ProjectPaymentLogsProps {
  projectId: string;
}

export function ProjectPaymentLogs({ projectId }: ProjectPaymentLogsProps) {
  const { t } = useTranslation();
  const [logs] = useState(paymentLogs);

  return (
    <ChartCard 
      title={t('paymentLogs')} 
      action={
        <Link to="/payment-logs">
          <Button size="sm" variant="ghost" className="gap-1">
            {t('viewAll')}
            <ExternalLink className="h-3 w-3" />
          </Button>
        </Link>
      }
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('invoiceId')}</TableHead>
              <TableHead>{t('client')}</TableHead>
              <TableHead>{t('plan')}</TableHead>
              <TableHead>{t('amount')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('paymentDate')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>{log.client}</TableCell>
                <TableCell>{log.plan}</TableCell>
                <TableCell>${log.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {log.status === "successful" ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {t('successful')}
                      </Badge>
                    ) : log.status === "failed" ? (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        <XCircle className="mr-1 h-3 w-3" />
                        {t('failed')}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {t('pending')}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ChartCard>
  );
}
