
import { useState } from "react";
import { Notification } from "@/domain/types";

// Mock notification data
const initialNotifications = [
  {
    id: "1",
    title: "New subscription",
    message: "Client John Smith subscribed to Pro Plan.",
    type: "info",
    read: false,
    date: "10 minutes ago",
    projectId: "proj-001",
    projectName: "Website Redesign"
  },
  {
    id: "2",
    title: "Payment failed",
    message: "Payment for client Jane Doe failed.",
    type: "error",
    read: false,
    date: "2 hours ago",
    projectId: "proj-002",
    projectName: "Mobile App"
  },
  {
    id: "3",
    title: "Subscription renewed",
    message: "Client Robert Johnson renewed Team Plan subscription.",
    type: "success",
    read: true,
    date: "Yesterday",
    projectId: "proj-001",
    projectName: "Website Redesign"
  },
  {
    id: "4",
    title: "Subscription expiring soon",
    message: "Client Emily Davis's subscription expires in 3 days.",
    type: "warning",
    read: false,
    date: "2 days ago",
    projectId: "proj-003",
    projectName: "E-commerce Platform"
  },
  {
    id: "5",
    title: "New client added",
    message: "Michael Wilson was added as a client.",
    type: "info",
    read: true,
    date: "3 days ago",
    projectId: "proj-002",
    projectName: "Mobile App"
  },
  {
    id: "6",
    title: "Payment received",
    message: "Payment of $249.00 received from Sarah Johnson.",
    type: "success",
    read: true,
    date: "1 week ago",
    projectId: "proj-001",
    projectName: "Website Redesign"
  },
  {
    id: "7",
    title: "System update",
    message: "The system will be updated on July 15, 2023.",
    type: "info",
    read: true,
    date: "1 week ago",
    projectId: null,
    projectName: null
  },
] as Notification[];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const getFilteredNotifications = (searchTerm: string) => {
    return notifications.filter(notification => 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notification.projectName && notification.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return {
    notifications,
    setNotifications,
    getFilteredNotifications,
    markAllAsRead,
    markAsRead,
    getUnreadCount,
  };
};
