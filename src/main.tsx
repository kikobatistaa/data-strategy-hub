import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "lenis/dist/lenis.css";
import { LanguageProvider, detectLanguage } from "./contexts/LanguageContext";
import { SmoothScrollProvider } from "./components/SmoothScroll";

const container = document.getElementById("root")!;

const app = (
  <LanguageProvider>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </LanguageProvider>
);

// Pages are prerendered in one language (data-prerender-lang). Hydrate when the
// visitor gets that language; otherwise render fresh in theirs.
const prerendered = document.documentElement.dataset.prerenderLang;
if (container.firstElementChild && prerendered === detectLanguage()) {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
