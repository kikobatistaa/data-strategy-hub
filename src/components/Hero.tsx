import { Button } from "@/components/ui/button";
import { Download, Mail, Linkedin, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import LanguageSelector from "./LanguageSelector";
import CVPreviewModal from "./CVPreviewModal";
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScroll";

const ThreeHeroBackground = lazy(() => import("./ThreeHeroBackground"));

interface HeroProps {
  preloaderDone?: boolean;
}

const Hero = ({ preloaderDone = false }: HeroProps) => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const { lenis } = useSmoothScroll();

  // Refs for parallax
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Refs for GSAP text animation
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Morphing role text
  const morphRef = useRef<HTMLSpanElement>(null);
  const roleVariants = (t as typeof t & { roleVariants?: string[] }).roleVariants || [
    "Data Strategist",
    "Analytics Engineer",
    "Business Intelligence",
    "Machine Learning",
  ];

  // rAF-throttled parallax
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

  // IntersectionObserver for 3D canvas
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

  // GSAP entrance animation after preloader
  useEffect(() => {
    if (!preloaderDone || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Just show everything immediately
      [nameRef, roleRef, titleRef, subtitleRef, buttonsRef, socialRef].forEach((ref) => {
        if (ref.current) ref.current.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Avatar scale in
      if (avatarRef.current) {
        tl.fromTo(
          avatarRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      }

      // Name - split chars and stagger
      if (nameRef.current) {
        const text = nameRef.current.textContent || "";
        nameRef.current.innerHTML = text
          .split("")
          .map((c) =>
            c === " "
              ? '<span class="inline-block">&nbsp;</span>'
              : `<span class="inline-block">${c}</span>`
          )
          .join("");

        const chars = nameRef.current.querySelectorAll("span");
        tl.fromTo(
          chars,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.04, stagger: 0.025, ease: "power3.out" },
          "-=0.2"
        );
      }

      // Role fade up
      if (roleRef.current) {
        tl.fromTo(
          roleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.1"
        );
      }

      // Title words
      if (titleRef.current) {
        const text = titleRef.current.innerHTML;
        // Wrap each word in a span while preserving the inner span
        const words = text.split(/(\s+)/);
        titleRef.current.innerHTML = words
          .map((w) =>
            w.trim() ? `<span class="inline-block">${w}</span>` : w
          )
          .join("");
        const wordEls = titleRef.current.querySelectorAll("span:not(.text-foreground\\/80 span)");
        tl.fromTo(
          wordEls,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }

      // Buttons stagger
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children;
        tl.fromTo(
          buttons,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.2"
        );
      }

      // Social
      if (socialRef.current) {
        tl.fromTo(
          socialRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  // Morphing role text - typewriter effect
  useEffect(() => {
    if (!preloaderDone) return;
    const el = morphRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let variantIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = roleVariants[variantIdx];
      if (isDeleting) {
        charIdx--;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          variantIdx = (variantIdx + 1) % roleVariants.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 40);
      } else {
        charIdx++;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
          isDeleting = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
        timeout = setTimeout(tick, 80);
      }
    };

    // Start after a delay to let the entrance animation finish
    timeout = setTimeout(tick, 2000);
    return () => clearTimeout(timeout);
  }, [preloaderDone, roleVariants]);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [lenis]);

  // Hide elements initially (before GSAP animates them in)
  const hiddenStyle = preloaderDone ? undefined : { opacity: 0 };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden py-32"
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ThreeHeroBackground isVisible={heroVisible} />
      </Suspense>

      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoMnYtMmgtMnYtMmgtMnYyaC0ydjJoMnptLTQgMHYyaC0ydjJoLTJ2MmgydjJoMnYiaDJ2LTJoMnYtMmgydi0yaC0ydi0yaC0ydi0yaC0yem0wIDBoMnYtMmgydi0iaC0ydi0yaC0ydjJoLTJ2MmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none will-change-transform z-[2]"
      />

      {/* Language Selector */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-[60]">
        <LanguageSelector />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center space-y-8 will-change-transform"
        >
          {/* Photo */}
          <div ref={avatarRef} className="flex justify-center will-change-transform" style={hiddenStyle}>
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

          {/* Name */}
          <div className="space-y-2">
            <h1
              ref={nameRef}
              className="text-4xl md:text-6xl font-bold text-foreground tracking-tight"
              style={hiddenStyle}
            >
              {t.name}
            </h1>
          </div>

          {/* Role with morphing text */}
          <div ref={roleRef} className="mb-6" style={hiddenStyle}>
            <p className="text-muted-foreground text-sm md:text-base font-medium tracking-[0.2em] uppercase">
              <span ref={morphRef} className="text-foreground/70">{roleVariants[0]}</span>
              <span className="animate-pulse ml-0.5 text-foreground/40">|</span>
            </p>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black text-foreground leading-tight tracking-tight"
            style={hiddenStyle}
          >
            {t.title}{" "}
            <span className="text-foreground/80">{t.titleAccent}</span>
          </h2>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            style={hiddenStyle}
          >
            {t.subtitle}
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <Button
              size="lg"
              className="btn-shine bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-bold group border border-primary/50"
              onClick={() => setCvModalOpen(true)}
              aria-label={t.downloadCV}
              data-magnetic
              style={hiddenStyle}
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" aria-hidden="true" />
              {t.downloadCV}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="btn-shine border-2 border-border hover:bg-muted hover:text-foreground backdrop-blur-sm px-8 py-6 text-lg font-bold shadow-lg transition-all duration-300"
              onClick={scrollToContact}
              aria-label={t.contactMe}
              data-magnetic
              style={hiddenStyle}
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              {t.contactMe}
            </Button>
          </div>

          <div ref={socialRef} className="pt-8 flex justify-center gap-6" style={hiddenStyle}>
            <a
              href="https://www.linkedin.com/in/kikobatistaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-card/50 backdrop-blur-md border border-border/50 hover:border-foreground/20 hover:bg-muted transition-all duration-300 shadow-lg"
              aria-label="LinkedIn Profile"
              data-magnetic
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
