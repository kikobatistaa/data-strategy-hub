import { AlertTriangle } from "lucide-react";

const DevBanner = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-secondary/80 backdrop-blur-md border-b border-border/50 text-center py-2">
      <div className="container mx-auto px-6">
        <div className="p-1 flex items-center justify-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-accent/80" />
          <p className="text-sm text-muted-foreground/80 font-medium">
            This portfolio is currently in active development. Expect frequent updates and changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevBanner;