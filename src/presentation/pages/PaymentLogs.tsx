
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MoreHorizontal, Download, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
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
import { useTranslation } from "@/hooks/useTranslation";
import { usePayments } from "@/application/hooks";

const PaymentLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const { getFilteredPayments } = usePayments();
  const navigate = useNavigate();

  const filteredPayments = getFilteredPayments(searchTerm);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('paymentLogsTitle')}</h1>
          <p className="text-muted-foreground">
            {t('paymentLogsSubtitle')}
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          {t('export')}
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchPayments')}
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
          <Filter className="h-4 w-4" />
          <span className="sr-only">{t('filter')}</span>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('invoiceId')}</TableHead>
              <TableHead>{t('client')}</TableHead>
              <TableHead>{t('plan')}</TableHead>
              <TableHead>{t('project')}</TableHead>
              <TableHead>{t('amount')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('paymentMethod')}</TableHead>
              <TableHead>{t('paymentDate')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.client}</TableCell>
                <TableCell>{payment.plan}</TableCell>
                <TableCell>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => navigate(`/projects/${payment.projectId}`)}
                  >
                    {payment.projectName}
                  </Button>
                </TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {payment.status === "successful" ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {t('successful')}
                      </Badge>
                    ) : payment.status === "failed" ? (
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
                      <DropdownMenuItem>{t('viewDetails')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('downloadReceipt')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('contactClient')}</DropdownMenuItem>
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
