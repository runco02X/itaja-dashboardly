
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Plus, Search, Filter, MoreHorizontal, Download, CheckCircle, XCircle } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock data
const initialClients = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    plan: "Pro Plan",
    spent: 1245,
    lastPayment: "2 days ago",
    avatar: "",
  },
  {
    id: "2",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    status: "active",
    plan: "Team Plan",
    spent: 3782,
    lastPayment: "1 week ago",
    avatar: "",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: "inactive",
    plan: "Basic Plan",
    spent: 849,
    lastPayment: "1 month ago",
    avatar: "",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "active",
    plan: "Enterprise Plan",
    spent: 12450,
    lastPayment: "3 days ago",
    avatar: "",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    status: "active",
    plan: "Pro Plan",
    spent: 2340,
    lastPayment: "1 day ago",
    avatar: "",
  },
];

const Clients = () => {
  const { t } = useTranslation();
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('clients')}</h1>
          <p className="text-muted-foreground">
            {t('manageClients')}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            {t('export')}
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            {t('createClient')}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchClients')}
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
              <TableHead>{t('client')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('plan')}</TableHead>
              <TableHead>{t('spent')}</TableHead>
              <TableHead>{t('lastPayment')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={client.avatar} alt={client.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {client.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {client.status === "active" ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {t('active')}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        {t('inactive')}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{client.plan}</TableCell>
                <TableCell>${client.spent.toLocaleString()}</TableCell>
                <TableCell>{client.lastPayment}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">{t('actions')}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>{t('viewDetails')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('billingHistory')}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {t('delete')}
                      </DropdownMenuItem>
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

export default Clients;
