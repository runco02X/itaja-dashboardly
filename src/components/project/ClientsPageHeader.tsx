
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Download, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ClientsPageHeaderProps {
  projectName: string;
  onBackClick: () => void;
  onExportClick: () => void;
  onCreateClick: () => void;
  onImportClick: () => void;
}

export function ClientsPageHeader({ 
  projectName, 
  onBackClick, 
  onExportClick, 
  onCreateClick,
  onImportClick
}: ClientsPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="group relative overflow-hidden" 
            onClick={onBackClick}
          >
            <span className="absolute inset-0 bg-primary-foreground/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <ArrowLeft className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span className="sr-only">{t('back')}</span>
          </Button>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold tracking-tight"
          >
            {projectName} {t('clients')}
          </motion.h1>
        </div>
        <p className="text-muted-foreground mt-1">
          {t('manageClients')}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto group"
          onClick={onExportClick}
        >
          <Download className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          {t('export')}
        </Button>
        <Button 
          variant="outline"
          className="w-full sm:w-auto group"
          onClick={onImportClick}
        >
          <Upload className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          {t('importClients')}
        </Button>
        <Button 
          className="w-full sm:w-auto group relative overflow-hidden"
          onClick={onCreateClick}
        >
          <span className="absolute inset-0 bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-all duration-300"></span>
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
          <span className="relative z-10">{t('createClient')}</span>
        </Button>
      </div>
    </div>
  );
}
