import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].navigation;

  const scrollToSection = (sectionId: string) => {
    setOpen(false); // Close menu after clicking
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 20;
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
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="fixed top-4 left-4 z-[60] h-10 w-10 text-foreground hover:bg-accent/10"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle className="text-left text-xl font-bold">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-8">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-3 text-lg font-medium text-foreground hover:bg-accent/10 hover:text-accent rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
