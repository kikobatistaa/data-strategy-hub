import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle } from "lucide-react";

const Warning = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-500/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center gap-3 text-amber-200">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-center sm:text-left">
            <span className="font-semibold">{t.warning.title}</span>
            <span className="text-sm text-amber-300/90">{t.warning.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
