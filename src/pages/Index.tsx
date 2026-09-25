import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Glance from "@/components/Glance";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToSection } from "@/lib/scrollTo";

// Only the two heavy sections are lazy: the video and the reCAPTCHA library.
const Personal = lazy(() => import("@/components/Personal"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionFallback = () => <div className="min-h-[60vh]" aria-hidden />;

const Index = () => {
  const { language } = useLanguage();
  const { lenis } = useSmoothScroll();
  const location = useLocation();

  // Deep links such as /#projects (used by the notebook viewer's back link).
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const frame = requestAnimationFrame(() => scrollToSection(id, lenis, true));
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  // Copy length changes with the language, so trigger positions must be recomputed.
  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(timer);
  }, [language]);

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Glance />
        <Experience />
        <Projects />
        <Testimonials />
        <Education />
        <div id="personal">
          <Suspense fallback={<SectionFallback />}>
            <Personal />
          </Suspense>
        </div>
        <div id="contact">
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
