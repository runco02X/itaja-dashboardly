import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";

export function AuthPageSettings() {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );
}
