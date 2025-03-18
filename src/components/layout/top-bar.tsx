
import { Bell, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

export function TopBar({ sidebarOpen, onSidebarOpenChange }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => onSidebarOpenChange(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground">2</span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[60vh] overflow-y-auto">
              <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-1 rounded-md px-4 py-3 text-sm">
                <div className="font-medium">New subscription</div>
                <div className="text-xs text-muted-foreground">
                  Client John Smith subscribed to Pro Plan.
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  10 minutes ago
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-1 rounded-md px-4 py-3 text-sm">
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
            <DropdownMenuItem className="cursor-pointer text-center text-sm font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <ThemeToggle />
      </div>
    </header>
  );
}
