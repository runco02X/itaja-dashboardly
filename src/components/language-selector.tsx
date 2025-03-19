
import { useLanguage } from "@/context/LanguageContext";
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

export function LanguageSelector() {
  const { language, setLanguage, t, isLanguageDetected } = useLanguage();
  
  // Get the list of supported languages
  const languages = getSupportedLanguages();
  
  // Find the current language option
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 flex items-center gap-2 px-3"
          disabled={!isLanguageDetected}
          aria-label={t('changeLanguage')}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">{currentLanguage.flag} {currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setLanguage(lang.code as SupportedLanguage)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              language === lang.code && "font-medium"
            )}
          >
            <span className="flex items-center gap-2">
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
            {language === lang.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
