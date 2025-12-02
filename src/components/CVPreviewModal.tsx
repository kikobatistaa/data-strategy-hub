import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

interface CVPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CVPreviewModal = ({ open, onOpenChange }: CVPreviewModalProps) => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset states when closing
      setIsLoading(true);
      setHasError(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t.cvPreviewTitle}</DialogTitle>
          <DialogDescription>{t.cvPreviewDescription}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 relative min-h-0 bg-muted/30 rounded-md overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <p className="text-muted-foreground mb-4">{t.cvLoadingError}</p>
            </div>
          ) : (
            <iframe
              src="/CV.pdf#view=FitH"
              className="w-full h-full border-0"
              title="CV Preview"
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>

        <DialogFooter className="flex-row gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => window.open("/CV.pdf", "_blank")}
            className="flex-1 sm:flex-none"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {t.openInNewTab}
          </Button>
          <Button asChild className="flex-1 sm:flex-none">
            <a href="/CV.pdf" download="Francisco_Batista_CV.pdf">
              <Download className="mr-2 h-4 w-4" />
              {t.downloadButton}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreviewModal;
