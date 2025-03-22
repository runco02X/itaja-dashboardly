
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
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
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useNotifications } from "@/application/hooks";
import { Notification } from "@/domain/types";

const NotificationItem = ({ notification, onMarkAsRead }: { notification: Notification; onMarkAsRead: (id: string) => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "success":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            {t('success')}
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            {t('error')}
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            {t('warning')}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {t('info')}
          </Badge>
        );
    }
  };

  return (
    <TableRow className={notification.read ? "" : "bg-muted/30"}>
      <TableCell>
        <div className="flex justify-center">
          {getNotificationIcon(notification.type)}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
            {notification.title}
          </span>
          <span className="text-sm text-muted-foreground">
            {notification.message}
          </span>
        </div>
      </TableCell>
      <TableCell>
        {notification.projectName ? (
          <Button 
            variant="link" 
            className="p-0 h-auto" 
            onClick={() => navigate(`/projects/${notification.projectId}`)}
          >
            {notification.projectName}
          </Button>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell>
        {getNotificationBadge(notification.type)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{notification.date}</span>
        </div>
      </TableCell>
      <TableCell>
        {!notification.read && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onMarkAsRead(notification.id)}
          >
            {t('markAsRead')}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const { 
    getFilteredNotifications, 
    markAllAsRead, 
    markAsRead,
    getUnreadCount
  } = useNotifications();

  const filteredNotifications = getFilteredNotifications(searchTerm);
  const unreadCount = getUnreadCount();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('notificationsTitle')}</h1>
          <p className="text-muted-foreground">
            {t('notificationsSubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              {t('markAllAsRead')}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchNotifications')}
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
              <TableHead className="w-12"></TableHead>
              <TableHead>{t('notification')}</TableHead>
              <TableHead>{t('project')}</TableHead>
              <TableHead>{t('type')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {t('noNotificationsFound')}
                </TableCell>
              </TableRow>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Notifications;
