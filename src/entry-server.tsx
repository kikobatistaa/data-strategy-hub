import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppContent } from "./App";
import { LanguageProvider, type Language } from "./contexts/LanguageContext";
import { SmoothScrollProvider } from "./components/SmoothScroll";

const tree = (url: string, language: Language) => (
  <LanguageProvider initialLanguage={language}>
    <SmoothScrollProvider>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </SmoothScrollProvider>
  </LanguageProvider>
);

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Renders one route to HTML. renderToString, not the streaming renderer: React 18's
 * stream can corrupt multi-byte characters at chunk boundaries. The first pass starts the
 * lazy sections (Personal, Contact) loading and renders their fallbacks; once those modules
 * have resolved, the second pass includes them.
 */
export async function render(url: string, language: Language): Promise<string> {
  renderToString(tree(url, language));
  await Promise.all([import("./components/Personal"), import("./components/Contact")]);
  await nextTick();
  return renderToString(tree(url, language));
}
