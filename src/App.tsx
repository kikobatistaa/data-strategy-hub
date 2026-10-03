import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Thesis from "./pages/Thesis";
import ProjectBid from "./pages/ProjectBid";
import ProjectBank from "./pages/ProjectBank";
import NotebookViewer from "./pages/NotebookViewer";

// Opacity only: a transform on the route wrapper would turn it into the
// containing block for `position: fixed` children (the nav) during transitions.
const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const Page = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    // initial={false}: the first page is already painted (prerendered), so it does not fade in.
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Index /></Page>} />
        {/* Language entry points: static HTML with localised meta tags (see pt/ and es/). */}
        <Route path="/pt" element={<Page><Index /></Page>} />
        <Route path="/es" element={<Page><Index /></Page>} />
        <Route path="/thesis" element={<Page><Thesis /></Page>} />
        <Route path="/projects/bid" element={<Page><ProjectBid /></Page>} />
        <Route path="/projects/bank" element={<Page><ProjectBank /></Page>} />
        <Route path="/privacy" element={<Page><Privacy /></Page>} />
        <Route path="/projects/spark-analytics/:notebook" element={<Page><NotebookViewer /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
    </AnimatePresence>
  );
};

/** Everything inside the router. Shared by the browser entry and the prerender entry. */
export const AppContent = () => {
  useEffect(() => {
    // Set by the inline script in <head> while a prerendered page is swapped for a
    // different language; the app is mounted now, so it can be shown.
    document.documentElement.classList.remove("pr-swap");
    (window as Window & { __mounted?: boolean }).__mounted = true;
  }, []);

  return (
    <TooltipProvider>
      <Sonner />
      <AnimatedRoutes />
    </TooltipProvider>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
