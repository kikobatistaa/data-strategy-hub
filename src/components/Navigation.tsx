/* src/components/Navigation.tsx */
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const Navigation = () => {
  const { language } = useLanguage();
  const t = translations[language].navigation;
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const tickingRef = useRef(false);

  // rAF-throttled sticky check
  const onScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const shouldStick = window.scrollY > window.innerHeight * 0.8;
      setIsSticky((prev) => (prev !== shouldStick ? shouldStick : prev));
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sections = ["experience", "education", "skills", "projects", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "experience", label: t.experience },
    { id: "education", label: t.education },
    { id: "skills", label: t.skills },
    { id: "projects", label: t.projects },
    { id: "about", label: t.about },
    { id: "contact", label: t.contact },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={`w-full z-50 transition-all duration-300 hidden lg:block ${
        isSticky
          ? "fixed top-0 bg-background/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "absolute top-0"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center py-6">
          <ul className="flex items-center gap-8 md:gap-12">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative text-sm md:text-base font-medium transition-colors duration-300 group ${
                    activeSection === item.id
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
