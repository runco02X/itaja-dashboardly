
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md p-6">
        <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
        <h2 className="text-2xl font-bold">{t('notFound')}</h2>
        <p className="text-muted-foreground">
          {t('notFoundMessage')}
        </p>
        <Button asChild className="mt-4">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('returnToDashboard')}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
