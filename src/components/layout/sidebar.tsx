
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Activity,
  CreditCard,
  Key,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  Users,
  Folder,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SidebarItemProps {
  icon: ReactNode;
  title: string;
  path: string;
  active: boolean;
}

const SidebarItem = ({ icon, title, path, active }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <div className="h-5 w-5 shrink-0">{icon}</div>
      <span>{title}</span>
    </NavLink>
  );
};

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-sidebar transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-4 gap-2 border-b border-border">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">I</div>
          <span className="text-xl font-semibold tracking-tight">Itaja</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          <div className="space-y-1 py-2">
            <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground">
              Dashboard
            </h3>
            <div className="space-y-1">
              <SidebarItem
                icon={<LayoutDashboard className="h-full w-full" />}
                title="Overview"
                path="/"
                active={isActive("/")}
              />
              <SidebarItem
                icon={<TrendingUp className="h-full w-full" />}
                title="Analytics"
                path="/analytics"
                active={isActive("/analytics")}
              />
            </div>
          </div>

          <div className="space-y-1 py-2">
            <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground">
              Management
            </h3>
            <div className="space-y-1">
              <SidebarItem
                icon={<Folder className="h-full w-full" />}
                title="Projects"
                path="/projects"
                active={isActive("/projects")}
              />
              <SidebarItem
                icon={<Users className="h-full w-full" />}
                title="Clients"
                path="/clients"
                active={isActive("/clients")}
              />
              <SidebarItem
                icon={<CreditCard className="h-full w-full" />}
                title="Subscriptions"
                path="/subscriptions"
                active={isActive("/subscriptions")}
              />
              <SidebarItem
                icon={<Activity className="h-full w-full" />}
                title="Payment Logs"
                path="/payment-logs"
                active={isActive("/payment-logs")}
              />
            </div>
          </div>

          <div className="space-y-1 py-2">
            <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground">
              Configuration
            </h3>
            <div className="space-y-1">
              <SidebarItem
                icon={<Key className="h-full w-full" />}
                title="API & Webhooks"
                path="/api-webhooks"
                active={isActive("/api-webhooks")}
              />
              <SidebarItem
                icon={<Settings className="h-full w-full" />}
                title="Settings"
                path="/settings"
                active={isActive("/settings")}
              />
            </div>
          </div>
        </nav>

        {/* User/Logout */}
        <div className="shrink-0 border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">JD</div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium">John Doe</span>
              <span className="truncate text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
            <button className="h-8 w-8 rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-4 w-4 mx-auto" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
