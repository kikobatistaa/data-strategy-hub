import type { Language } from "@/contexts/LanguageContext";
import { en, type Translation } from "./en";
import { ptPT } from "./pt-pt";
import { es } from "./es";

export type { Translation, CaseStudy } from "./en";

export const translations: Record<Language, Translation> = {
  en,
  "pt-pt": ptPT,
  es,
};

export type ProjectId = keyof Translation["projects"]["items"];
