import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const DevelopmentBanner = () => {
  const { language } = useLanguage();
  // The 'banner' key is defined in translations.ts.
  const t = translations[language].banner.developmentWarning;

  return (
    <div className="sticky top-0 z-50 w-full bg-secondary/80 backdrop-blur-md border-b border-accent/20 text-center text-sm py-2.5 shadow-xl">
      <div className="container mx-auto px-6">
        <p className="font-semibold text-accent animate-pulse">
          {t}
        </p>
      </div>
    </div>
  );
};

export default DevelopmentBanner;