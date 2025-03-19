
import { useTranslation } from "@/hooks/useTranslation";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ClientsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ClientsSearchBar({ searchTerm, onSearchChange }: ClientsSearchBarProps) {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 sm:flex-row"
    >
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('searchClients')}
          className="w-full pl-8 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 shrink-0 hover:bg-primary/5 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span className="sr-only">{t('filter')}</span>
      </Button>
    </motion.div>
  );
}
