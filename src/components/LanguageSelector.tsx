import { Fragment } from "react";
import { useLanguage, LANGUAGES, type Language } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { cn } from "@/lib/utils";

const LABELS: Record<Language, string> = { en: "EN", "pt-pt": "PT", es: "ES" };

const LanguageSelector = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <div
      role="group"
      aria-label={t.language}
      className={cn("flex items-center font-mono text-[11px] tracking-[0.18em]", className)}
    >
      {LANGUAGES.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span aria-hidden className="px-1 text-muted-foreground/50">
              /
            </span>
          )}
          <button
            type="button"
            aria-pressed={language === code}
            onClick={() => setLanguage(code)}
            className={cn(
              "px-1 py-1 uppercase transition-colors",
              language === code ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {LABELS[code]}
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default LanguageSelector;
