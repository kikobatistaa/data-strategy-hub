import { Button } from "@/components/ui/button";
import { Download, Mail, Linkedin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import LanguageSelector from "./LanguageSelector";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoMnYtMmgtMnYtMmgtMnYyaC0ydjJoMnptLTQgMHYyaC0ydjJoLTJ2MmgydjJoMnYiaDJ2LTJoMnYtMmgydi0yaC0ydi0yaC0ydi0yaC0yem0wIDBoMnYtMmgydi0iaC0ydi0iaC0ydjJoLTJ2MmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none" />
      
      {/* Language Selector - Top Right */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-[60]">
        <LanguageSelector />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* Photo Section */}
          <div className="flex justify-center">
            <div className="p-1 rounded-full bg-gradient-to-r from-accent via-purple-400 to-accent">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background">
                <AvatarImage src="/profile.jpg" alt="Francisco Cordeiro Batista" className="object-cover" />
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

          {/* Updated Role Badge with improved visuals */}
          <div className="inline-block mb-4">
            <div className="px-6 py-2.5 bg-accent/10 backdrop-blur-md rounded-full border border-accent/20 shadow-glow transition-all duration-300 hover:bg-accent/15 hover:border-accent/30 hover:scale-105 cursor-default">
              <p className="text-accent text-sm md:text-base font-semibold tracking-wide uppercase">
                {t.role}
              </p>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-foreground leading-tight tracking-tight">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-accent via-purple-400 to-accent bg-clip-text text-transparent">
              {t.titleAccent}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            {/* 1. Download CV Button */}
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-bold group border border-primary/50"
            >
              <a href="/CV.pdf" download="Francisco_Batista_CV.pdf">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                {t.downloadCV}
              </a>
            </Button>
            
            {/* 2. Contact Me Button */}
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-2 border-white/20 bg-gradient-cta text-white hover:bg-accent/80 hover:text-white hover:border-accent/50 backdrop-blur-sm px-8 py-6 text-lg font-bold shadow-lg transition-all duration-300"
            >
              <a href="mailto:kiko.2205@hotmail.com">
                <Mail className="mr-2 h-5 w-5" />
                {t.contactMe}
              </a>
            </Button>
          </div>
          
          <div className="pt-8 flex justify-center gap-6">
            <a 
              href="https://www.linkedin.com/in/kikobatistaa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-card/50 backdrop-blur-md border border-border/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 shadow-lg"
            >
              <Linkedin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;