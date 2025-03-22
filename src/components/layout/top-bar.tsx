
import { Bell, Menu, X, User, LogOut, Settings as SettingsIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { SkipToContent } from "@/components/accessibility/skip-to-content";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProjectSwitcher } from "@/components/project/ProjectSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TopBarProps {
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

export function TopBar({ sidebarOpen, onSidebarOpenChange }: TopBarProps) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Check if we're on a project-related route
  const isProjectRoute = location.pathname.includes('/projects/');
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SkipToContent />
      
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => onSidebarOpenChange(!sidebarOpen)}
        aria-label={sidebarOpen ? t('closeMenu') : t('openMenu')}
      >
        {sidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
        <span className="sr-only">{sidebarOpen ? t('closeMenu') : t('openMenu')}</span>
      </Button>
      
      {/* Project Switcher - only show on project routes or main dashboard */}
      {(isProjectRoute || location.pathname === '/' || location.pathname === '/projects') && (
        <div className="hidden md:block">
          <ProjectSwitcher />
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        <LanguageSelector />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "relative h-9 w-9 transition-all",
                "hover:border-primary hover:bg-accent"
              )}
              aria-label={t('notifications')}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">2</span>
              <span className="sr-only">{t('notifications')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 animate-in slide-in-from-top-2 fade-in-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>{t('notifications')}</span>
              <Button variant="ghost" size="sm" className="h-auto text-xs px-2 py-1 hover:bg-muted">
                {t('markAllAsRead')}
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[60vh] overflow-y-auto">
              <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-1 rounded-md px-4 py-3 text-sm hover:bg-muted focus:bg-muted">
                <div className="font-medium">New subscription</div>
                <div className="text-xs text-muted-foreground">
                  Client John Smith subscribed to Pro Plan.
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  10 minutes ago
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-1 rounded-md px-4 py-3 text-sm hover:bg-muted focus:bg-muted">
                <div className="font-medium">Payment failed</div>
                <div className="text-xs text-muted-foreground">
                  Payment for client Jane Doe failed.
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  2 hours ago
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-center text-sm font-medium text-primary hover:bg-muted focus:bg-muted"
              onClick={() => navigate('/notifications')}
            >
              {t('viewAllNotifications')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <ThemeToggle />
        
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative h-8 w-8 rounded-full transition-all hover:border-primary hover:ring-1 hover:ring-primary/20"
              aria-label="User menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
              </div>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-2 fade-in-80">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || ''}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => navigate('/settings')}
              className="cursor-pointer hover:bg-muted focus:bg-muted transition-colors"
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              {t('settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
