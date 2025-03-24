
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

interface Payment {
  id: string;
  amount: string;
  status: 'succeeded' | 'processing' | 'failed';
  date: string;
  method: string;
  description: string;
}

interface ProjectPaymentLogsProps {
  projectId: string;
}

// Mock data for payment logs
const getMockPayments = (projectId: string): Payment[] => {
  return [
    {
      id: '1',
      amount: '$89.99',
      status: 'succeeded',
      date: '2023-09-01',
      method: 'Credit Card',
      description: 'Monthly subscription'
    },
    {
      id: '2',
      amount: '$149.99',
      status: 'processing',
      date: '2023-08-28',
      method: 'Bank Transfer',
      description: 'Premium plan upgrade'
    },
    {
      id: '3',
      amount: '$49.99',
      status: 'failed',
      date: '2023-08-25',
      method: 'PayPal',
      description: 'Add-on service purchase'
    },
    {
      id: '4',
      amount: '$29.99',
      status: 'succeeded',
      date: '2023-08-20',
      method: 'Credit Card',
      description: 'Basic subscription'
    },
    {
      id: '5',
      amount: '$199.99',
      status: 'succeeded',
      date: '2023-08-15',
      method: 'Credit Card',
      description: 'Annual plan payment'
    }
  ];
};

export function ProjectPaymentLogs({ projectId }: ProjectPaymentLogsProps) {
  const { t } = useTranslation();
  const payments = getMockPayments(projectId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('paymentLogs')}</CardTitle>
        <CardDescription>
          {t('recentTransactions')} {projectId && `for project ${projectId}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('amount')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('method')}</TableHead>
              <TableHead>{t('description')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.amount}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(payment.status)}`}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
