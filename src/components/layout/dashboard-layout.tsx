
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider defaultTheme="system" storageKey="itaja-ui-theme">
      <div className="flex min-h-screen bg-background">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <div className="flex flex-1 flex-col">
          <TopBar sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
