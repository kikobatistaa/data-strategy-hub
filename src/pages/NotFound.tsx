import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import LanguageSelector from "@/components/LanguageSelector";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language].notFound;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>

      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* 404 Number */}
        <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-br from-zinc-400 via-zinc-500 to-zinc-600 bg-clip-text text-transparent mb-8">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
          {t.description}
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button 
              size="lg"
              className="bg-zinc-800 hover:bg-zinc-700 text-foreground font-semibold border border-border shadow-lg transition-all duration-300"
              aria-label={t.backHome}
            >
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              {t.backHome}
            </Button>
          </Link>

          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="bg-transparent border-border text-foreground hover:bg-muted transition-all duration-300"
            aria-label={t.goBack}
          >
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            {t.goBack}
          </Button>
        </div>

        {/* Attempted Path Display */}
        {location.pathname && (
          <div className="mt-12 p-4 bg-muted/50 backdrop-blur-md border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              {t.attemptedPath}: <span className="text-foreground font-mono">{location.pathname}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
