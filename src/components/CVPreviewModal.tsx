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
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ExternalLink } from "lucide-react";
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
      <DialogContent className="max-w-5xl w-[95vw] h-[70vh] sm:h-[85vh] flex flex-col p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{t.cvPreviewTitle}</DialogTitle>
          <DialogDescription>{t.cvPreviewDescription}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 relative min-h-0 bg-muted/30 rounded-md overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col p-6 gap-4 bg-muted/50">
              {/* Header skeleton */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              {/* Content skeleton */}
              <div className="space-y-3 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <div className="pt-4 space-y-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-11/12" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
                <div className="pt-4 space-y-3">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-10/12" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="pt-4 space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <div className="flex gap-2 flex-wrap">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                    <Skeleton className="h-6 w-18 rounded-full" />
                  </div>
                </div>
              </div>
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
            aria-label={t.openInNewTab}
          >
            <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
            {t.openInNewTab}
          </Button>
          <Button asChild className="flex-1 sm:flex-none">
            <a href="/CV.pdf" download="Francisco_Batista_CV.pdf" aria-label={t.downloadButton}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              {t.downloadButton}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreviewModal;
