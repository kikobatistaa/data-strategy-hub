import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "lenis/dist/lenis.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SmoothScrollProvider } from "./components/SmoothScroll";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </LanguageProvider>
);
