/* src/components/Navigation.tsx */
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const { language } = useLanguage();
  const t = translations[language].navigation;
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Make sticky after scrolling past hero section (roughly 100vh)
      setIsSticky(window.scrollY > window.innerHeight * 0.8);

      // Detect active section
      const sections = ["experience", "education", "projects", "about"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky nav height
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
  ];

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 hidden lg:block ${
        isSticky
          ? "fixed top-0 bg-background/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "absolute top-0"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-6">
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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
