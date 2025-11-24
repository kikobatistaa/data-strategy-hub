import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, flag: '🇬🇧', label: 'English' },
    { code: 'pt-pt' as const, flag: '🇵🇹', label: 'Português (PT)' },
    { code: 'pt-br' as const, flag: '🇧🇷', label: 'Português (BR)' },
    { code: 'es' as const, flag: '🇪🇸', label: 'Español' }
  ];

  return (
    <div className="flex gap-2 items-center bg-card/30 backdrop-blur-md rounded-full p-1.5 border border-white/10">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className={`rounded-full h-10 w-10 p-0 text-2xl hover:bg-accent/20 transition-all ${
            language === lang.code 
              ? 'bg-accent/20 ring-2 ring-accent/50' 
              : 'opacity-60 hover:opacity-100'
          }`}
          aria-label={lang.label}
          title={lang.label}
        >
          {lang.flag}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
