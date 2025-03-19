
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function SkipToContent() {
  const { t } = useTranslation();
  
  return (
    <a
      href="#main-content" 
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-md",
        "transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
    >
      {t('skipToContent')}
    </a>
  );
}
