import type { Language } from "@/contexts/LanguageContext";

// Hand-rolled instead of Intl: pages are prerendered in Node and hydrated in the
// browser, and ICU builds differ in spacing details, which would break hydration.

const MINUS = "−";

const withDecimal = (value: string, language: Language) =>
  language === "en" ? value : value.replace(".", ",");

/** 7.95 → "7.95%" (en) or "7,95%" (pt/es). `signed` adds + for positive values. */
export function formatPercent(value: number, language: Language, digits = 2, signed = false) {
  const body = withDecimal(Math.abs(value).toFixed(digits), language);
  const sign = value < 0 ? MINUS : signed && value > 0 ? "+" : "";
  return `${sign}${body}%`;
}

/** Basis points, rounded: 20.4 → "20 bp" ("20 pb" in Spanish). */
export function formatBp(value: number, language: Language, signed = false) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? MINUS : signed && rounded > 0 ? "+" : "";
  return `${sign}${Math.abs(rounded)} ${language === "es" ? "pb" : "bp"}`;
}

/** EUR, compact: 49276 → "€49k" (en) or "49 mil €" (pt/es); 3708519 → "€3.7M" / "3,7 M€". */
export function formatEurCompact(value: number, language: Language) {
  const abs = Math.abs(value);
  const sign = value < 0 ? MINUS : "";
  const millions = abs >= 1_000_000;
  const scaled = millions ? abs / 1_000_000 : abs / 1_000;
  const number = withDecimal(millions ? scaled.toFixed(1) : Math.round(scaled).toString(), language);
  if (language === "en") return `${sign}€${number}${millions ? "M" : "k"}`;
  return `${sign}${number}${millions ? " M€" : " mil €"}`;
}

/** EUR, full: 49276 → "49,276" (en) or "49 276" (pt/es). Negatives in parentheses, accounting style. */
export function formatEurFull(value: number, language: Language) {
  const digits = Math.round(Math.abs(value)).toString();
  const separator = language === "en" ? "," : " ";
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return value < 0 ? `(${grouped})` : grouped;
}

/** USD millions with one decimal: 1.04 → "$1.0M". */
export function formatUsdMillions(value: number, language: Language) {
  const sign = value < 0 ? MINUS : "";
  return `${sign}$${withDecimal(Math.abs(value).toFixed(1), language)}M`;
}

/** Plain decimal with locale separator. */
export function formatDecimal(value: number, language: Language, digits = 2) {
  const sign = value < 0 ? MINUS : "";
  return `${sign}${withDecimal(Math.abs(value).toFixed(digits), language)}`;
}
