import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "pt-pt" | "es";
export const LANGUAGES: Language[] = ["en", "pt-pt", "es"];

const HTML_LANG: Record<Language, string> = { en: "en", "pt-pt": "pt-PT", es: "es" };
const STORAGE_KEY = "language";

const isLanguage = (value: unknown): value is Language =>
  typeof value === "string" && (LANGUAGES as string[]).includes(value);

const detectLanguage = (): Language => {
  try {
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(detectLanguage);

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
