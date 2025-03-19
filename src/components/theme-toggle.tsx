
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "@/hooks/useTranslation";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 transition-colors hover:border-primary" aria-label={t('changeTheme')}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('changeTheme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem] p-2 animate-in slide-in-from-top-2 fade-in-80">
        <DropdownMenuItem 
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-secondary",
            theme === "light" && "bg-muted/50"
          )} 
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" />
          <span>{t('lightMode')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-secondary",
            theme === "dark" && "bg-muted/50"
          )} 
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" />
          <span>{t('darkMode')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
