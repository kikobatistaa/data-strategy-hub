import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import LanguageSelector from "@/components/LanguageSelector";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language].notFound;

  useEffect(() => {
    console.error("404: attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center bg-background">
      <div className="absolute right-6 top-5">
        <LanguageSelector />
      </div>

      <div className="container animate-fade-in">
        <p className="eyebrow mb-6 text-gold">404</p>
        <h1 className="text-display-xl">{t.title}</h1>
        <p className="mt-8 max-w-[48ch] text-lg text-muted-foreground">{t.description}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex h-12 items-center bg-primary px-6 font-mono text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-gold"
          >
            {t.backHome}
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-12 items-center border border-border px-6 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground"
          >
            {t.goBack}
          </button>
        </div>

        <p className="mt-16 font-mono text-xs text-muted-foreground">
          {t.attemptedPath}: <span className="text-foreground">{location.pathname}</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
