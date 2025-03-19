import { useState, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { downloadClientImportTemplate } from "@/utils/file-helpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileType, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ImportClientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (file: File) => void;
  projectName: string;
}

export function ImportClientsDialog({
  open,
  onOpenChange,
  onImport,
  projectName,
}: ImportClientsDialogProps) {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const validExtensions = [".csv", ".xls", ".xlsx"];
    
    // Check file type
    if (!validTypes.includes(file.type) && 
        !validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setError(t("invalidFileType"));
      return false;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError(t("fileTooLarge"));
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onImport(selectedFile);
      setSelectedFile(null);
      onOpenChange(false);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("importClients")}</DialogTitle>
          <DialogDescription>
            {t("importClientsDescription", { projectName })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("error")}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            } ${selectedFile ? "bg-muted/50" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <>
                <div className="rounded-full bg-primary/10 p-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{t("dragAndDropFile")}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("supportedFormats")}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleButtonClick}
                >
                  {t("browseFiles")}
                </Button>
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleChange}
                />
              </>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <div className="rounded-md bg-primary/10 p-2">
                  <FileType className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Label htmlFor="sample-template" className="text-sm font-medium">
              {t("needTemplate")}
            </Label>
            <div className="mt-2">
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-primary"
                onClick={() => downloadClientImportTemplate()}
              >
                {t("downloadTemplate")}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedFile}
            className="relative group"
          >
            <CheckCircle2 className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {t("importClients")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
