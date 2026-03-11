import { Button } from "@/components/ui/button";
import { Download, Mail, Linkedin, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import LanguageSelector from "./LanguageSelector";
import CVPreviewModal from "./CVPreviewModal";
import { useState, useEffect, useRef, lazy, Suspense } from "react";

const ThreeHeroBackground = lazy(() => import("./ThreeHeroBackground"));

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Refs for parallax (no re-renders)
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // rAF-throttled parallax via direct DOM manipulation
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.5}px)`;
        if (contentRef.current) contentRef.current.style.transform = `translateY(-${y * 0.15}px)`;
        if (avatarRef.current) avatarRef.current.style.transform = `translateY(-${y * 0.25}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver to pause 3D canvas when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden py-32">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ThreeHeroBackground isVisible={heroVisible} />
      </Suspense>

      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoMnYtMmgtMnYtMmgtMnYyaC0ydjJoMnptLTQgMHYyaC0ydjJoLTJ2MmgydjJoMnYiaDJ2LTJoMnYtMmgydi0yaC0ydi0yaC0ydi0yaC0yem0wIDBoMnYtMmgydi0iaC0ydi0yaC0ydjJoLTJ2MmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none will-change-transform z-[2]"
      />

      {/* Language Selector - Top Right */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-[60]">
        <LanguageSelector />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 will-change-transform"
        >

          {/* Photo Section */}
          <div
            ref={avatarRef}
            className="flex justify-center will-change-transform"
          >
            <div className="p-1 rounded-full bg-gradient-to-r from-foreground/20 to-foreground/10">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background">
                <AvatarImage
                  src="/profile.jpg"
                  alt="Francisco Cordeiro Batista"
                  className="object-cover"
                  loading="eager"
                />
                <AvatarFallback className="text-2xl font-bold">FCB</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Name Section */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              {t.name}
            </h1>
          </div>

          {/* Role Display - Minimal Research Aesthetic */}
          <div className="mb-6">
            <p className="text-muted-foreground text-sm md:text-base font-medium tracking-[0.2em] uppercase">
              {t.role}
            </p>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-foreground leading-tight tracking-tight">
            {t.title}{" "}
            <span className="text-foreground/80">
              {t.titleAccent}
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            {/* 1. Download CV Button */}
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-bold group border border-primary/50"
              onClick={() => setCvModalOpen(true)}
              aria-label={t.downloadCV}
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" aria-hidden="true" />
              {t.downloadCV}
            </Button>

            {/* 2. Contact Me Button */}
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-border hover:bg-muted hover:text-foreground backdrop-blur-sm px-8 py-6 text-lg font-bold shadow-lg transition-all duration-300"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label={t.contactMe}
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              {t.contactMe}
            </Button>
          </div>

          <div className="pt-8 flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/kikobatistaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-card/50 backdrop-blur-md border border-border/50 hover:border-foreground/20 hover:bg-muted transition-all duration-300 shadow-lg"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6 text-foreground group-hover:scale-110 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <a
          href="#experience"
          className="animate-bounce flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      <CVPreviewModal open={cvModalOpen} onOpenChange={setCvModalOpen} />
    </section>
  );
};

export default Hero;
