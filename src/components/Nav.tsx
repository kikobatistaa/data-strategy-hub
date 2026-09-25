import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { cn } from "@/lib/utils";
import AnchorLink from "./AnchorLink";
import LanguageSelector from "./LanguageSelector";

const SECTIONS = ["experience", "projects", "education", "personal", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const Nav = () => {
  const { language } = useLanguage();
  const t = translations[language].nav;
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);

  // Solid background once the hero starts scrolling away.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: one observer over the five section ids.
  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent"
      )}
    >
      <nav className="container flex h-full items-center justify-between" aria-label="Primary">
        <AnchorLink to="top" className="font-display text-xl tracking-tight text-foreground" aria-label={t.home}>
          <span className="hidden sm:inline">Francisco Batista</span>
          <span className="sm:hidden">FB</span>
        </AnchorLink>

        {/* Desktop */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {SECTIONS.map((id) => (
              <li key={id} className="relative">
                <AnchorLink
                  to={id}
                  className={cn(
                    "eyebrow transition-colors hover:text-foreground",
                    active === id && "text-foreground"
                  )}
                >
                  {t[id]}
                </AnchorLink>
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gold transition-opacity duration-300",
                    active === id ? "opacity-100" : "opacity-0"
                  )}
                />
              </li>
            ))}
          </ul>
          <LanguageSelector />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSelector />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground"
                aria-label={t.menu}
              >
                <Menu className="h-4 w-4" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l border-border bg-background p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">{t.menu}</SheetTitle>
              <div className="flex h-full flex-col justify-between px-8 pb-12 pt-24">
                <ul className="space-y-6">
                  {SECTIONS.map((id) => (
                    <li key={id}>
                      <AnchorLink
                        to={id}
                        delay={320}
                        onNavigate={() => setOpen(false)}
                        className={cn(
                          "font-display text-4xl tracking-tight transition-colors",
                          active === id ? "text-gold" : "text-foreground"
                        )}
                      >
                        {t[id]}
                      </AnchorLink>
                    </li>
                  ))}
                </ul>
                <p className="eyebrow">Francisco Cordeiro Batista</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
