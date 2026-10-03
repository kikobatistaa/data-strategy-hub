import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "pt-pt" | "es";
export const LANGUAGES: Language[] = ["en", "pt-pt", "es"];

const HTML_LANG: Record<Language, string> = { en: "en", "pt-pt": "pt-PT", es: "es" };
const STORAGE_KEY = "language";

const isLanguage = (value: unknown): value is Language =>
  typeof value === "string" && (LANGUAGES as string[]).includes(value);

// Keep in sync with the inline script that scripts/prerender.mjs puts in <head>.
export const detectLanguage = (): Language => {
  try {
    // /pt/ and /es/ are the localised entry points (static HTML with their own meta tags).
    const fromPath = window.location.pathname.match(/^\/(pt|es)\/?$/)?.[1];
    if (fromPath === "pt") return "pt-pt";
    if (fromPath === "es") return "es";

    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLanguage(fromUrl)) return fromUrl;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt-br") return "pt-pt"; // legacy value from the previous site
    if (isLanguage(saved)) return saved;

    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("pt")) return "pt-pt";
    if (nav.startsWith("es")) return "es";
  } catch {
    /* storage or window unavailable */
  }
  return "en";
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage,
}) => {
  // initialLanguage is set when prerendering in Node, where there is no window to detect from.
  const [language, setLanguage] = useState<Language>(() => initialLanguage ?? detectLanguage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      // Keys left behind by the previous version of the site.
      localStorage.removeItem("job-drawer-dismissed");
      sessionStorage.removeItem("preloader-shown");
    } catch {
      /* ignore */
    }
    document.documentElement.lang = HTML_LANG[language];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
