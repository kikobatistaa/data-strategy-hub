import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/contexts/LanguageContext"; // Import Language type
// Removed import: import { translations } from "@/locales/translations";

const languageOptions: { value: Language, label: string }[] = [
    { value: "en", label: "English" },
    { value: "pt-pt", label: "Português (Portugal)" },
    { value: "pt-br", label: "Português (Brasil)" },
    { value: "es", label: "Español" },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  // Removed: const t = translations[language].languageSelector;
  
  // Find the current label dynamically
  const currentOption = languageOptions.find(opt => opt.value === language);
  const currentLabel = currentOption ? currentOption.label : "Language";
  
  const handleLanguageChange = (newLang: Language) => {
    // Cast is no longer needed since newLang is typed as Language
    setLanguage(newLang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {languageOptions.map((option) => (
            <DropdownMenuItem 
                key={option.value}
                onClick={() => handleLanguageChange(option.value)}
                disabled={option.value === language}
            >
                <Globe className="mr-2 h-4 w-4" />
                <span>{option.label}</span>
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;