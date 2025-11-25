import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languageOptions: { code: Language, flag: string, label: string }[] = [
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'pt-pt', flag: '🇵🇹', label: 'Português (PT)' },
    { code: 'pt-br', flag: '🇧🇷', label: 'Português (BR)' },
    { code: 'es', flag: '🇪🇸', label: 'Español' }
  ];
  
  const currentLang = languageOptions.find(opt => opt.code === language) || languageOptions[0];

  const handleLanguageChange = (newLangCode: Language) => {
    setLanguage(newLangCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 text-muted-foreground hover:text-foreground relative z-50"
          aria-label={`Current language: ${currentLang.label}`}
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-[100] bg-background border-border shadow-lg backdrop-blur-md">
        {languageOptions.map((option) => (
            <DropdownMenuItem 
                key={option.code}
                onClick={() => handleLanguageChange(option.code)} 
                disabled={option.code === language}
                className="cursor-pointer"
            >
                <span className="mr-3 text-lg">{option.flag}</span>
                <span>{option.label}</span>
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;