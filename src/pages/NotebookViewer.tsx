import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const NOTEBOOK_URLS = {
  traffic: "https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/2903900417904720/2428841347580027/6154594242300663/latest.html",
  spotify: "https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/2903900417904720/4362987474355535/6154594242300663/latest.html"
};

const NOTEBOOK_TITLES = {
  traffic: {
    en: "Traffic Prediction Analysis",
    "pt-pt": "Análise de Previsão de Tráfego",
    "pt-br": "Análise de Previsão de Tráfego",
    es: "Análisis de Predicción de Tráfico"
  },
  spotify: {
    en: "Spotify Playlist Analysis",
    "pt-pt": "Análise de Playlists Spotify",
    "pt-br": "Análise de Playlists Spotify",
    es: "Análisis de Playlists Spotify"
  }
};

const NotebookViewer = () => {
  const { notebook } = useParams<{ notebook: "traffic" | "spotify" }>();
  const { language } = useLanguage();
  const t = translations[language].projects;
  
  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const notebookUrl = notebook ? NOTEBOOK_URLS[notebook as keyof typeof NOTEBOOK_URLS] : null;
  const notebookTitle = notebook ? NOTEBOOK_TITLES[notebook as keyof typeof NOTEBOOK_TITLES]?.[language] : "";

  useEffect(() => {
    // Timeout fallback - if iframe doesn't load in 8 seconds, show fallback
    const timer = setTimeout(() => {
      if (loading) {
        setIframeError(true);
        setLoading(false);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setLoading(false);
  };

  if (!notebookUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Notebook not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/#projects">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t.title}</span>
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">{notebookTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(notebookUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open External</span>
            </Button>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative">
        {loading && !iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Loading notebook...</p>
            </div>
          </div>
        )}

        {iframeError ? (
          <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md px-6 space-y-6">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Embedded View Unavailable</h2>
                <p className="text-muted-foreground">
                  The notebook cannot be displayed inline due to security restrictions. 
                  Click below to view it directly on Databricks.
                </p>
              </div>
              <Button
                onClick={() => window.open(notebookUrl, "_blank")}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in Databricks
              </Button>
            </div>
          </div>
        ) : (
          <iframe
            src={notebookUrl}
            className="w-full h-[calc(100vh-73px)] border-0"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title={notebookTitle}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )}
      </main>
    </div>
  );
};

export default NotebookViewer;
