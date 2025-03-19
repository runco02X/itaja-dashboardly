
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSupportedLanguages, SupportedLanguage } from "@/translations";
import { useEffect, useState } from "react";

export function LanguageSelector() {
  const { language, setLanguage, t, isLanguageDetected } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Get the list of supported languages
  const languages = getSupportedLanguages();
  
  // Find the current language option
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Announce language change to screen readers
  useEffect(() => {
    const announcer = document.getElementById('language-change-announcer');
    if (announcer) {
      announcer.textContent = `${t('languageChanged')} ${currentLanguage.name}`;
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  }, [language, currentLanguage.name, t]);

  return (
    <>
      {/* Screen reader announcer */}
      <div 
        id="language-change-announcer" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 flex items-center gap-2 px-3 transition-all duration-200 hover:border-primary"
            disabled={!isLanguageDetected}
            aria-label={t('changeLanguage')}
          >
            <Globe className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline-block font-medium">{currentLanguage.flag} {currentLanguage.name}</span>
            <span className="sm:hidden">{currentLanguage.flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px] animate-in fade-in-80">
          <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as SupportedLanguage);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center justify-between cursor-pointer group transition-colors hover:bg-muted",
                language === lang.code && "font-medium bg-muted/50"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {language === lang.code && <Check className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
