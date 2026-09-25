import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const NOTEBOOK_URLS = {
  traffic:
    "https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/2903900417904720/2428841347580027/6154594242300663/latest.html",
  spotify:
    "https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/2903900417904720/4362987474355535/6154594242300663/latest.html",
} as const;

type NotebookId = keyof typeof NOTEBOOK_URLS;

const isNotebookId = (value: string | undefined): value is NotebookId =>
  value === "traffic" || value === "spotify";

const actionClass = "eyebrow inline-flex items-center gap-2 text-foreground transition-colors hover:text-gold";

const NotebookViewer = () => {
  const { notebook } = useParams<{ notebook: string }>();
  const { language } = useLanguage();
  const t = translations[language].notebook;

  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const notebookId = isNotebookId(notebook) ? notebook : null;
  const notebookUrl = notebookId ? NOTEBOOK_URLS[notebookId] : null;
  const notebookTitle = notebookId ? t.titles[notebookId] : "";

  useEffect(() => {
    // If the iframe has not loaded after 8s, show the fallback.
    const timer = setTimeout(() => {
      if (loading) {
        setIframeError(true);
        setLoading(false);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [loading]);

  if (!notebookUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="eyebrow">{t.notFound}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-full items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-6">
            <Link to="/#projects" className={actionClass}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{t.back}</span>
            </Link>
            <h1 className="truncate font-display text-xl">{notebookTitle}</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href={notebookUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>
              <span className="hidden sm:inline">{t.openExternal}</span>
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="relative flex-1">
        {loading && !iframeError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden />
              <p className="eyebrow">{t.loading}</p>
            </div>
          </div>
        )}

        {iframeError ? (
          <div className="flex min-h-[60vh] flex-1 items-center justify-center">
            <div className="max-w-md space-y-6 px-6 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden />
              <div className="space-y-3">
                <h2 className="font-display text-2xl">{t.unavailableTitle}</h2>
                <p className="text-muted-foreground">{t.unavailableText}</p>
              </div>
              <a
                href={notebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 bg-primary px-6 font-mono text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-gold"
              >
                {t.openExternal}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={notebookUrl}
            className="h-[calc(100vh-4rem)] w-full border-0"
            onLoad={() => setLoading(false)}
            onError={() => {
              setIframeError(true);
              setLoading(false);
            }}
            title={notebookTitle}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )}
      </main>
    </div>
  );
};

export default NotebookViewer;
