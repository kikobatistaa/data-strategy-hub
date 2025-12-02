import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-secondary text-primary-foreground py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 text-foreground">Francisco Cordeiro Batista</h3>
              <p className="text-muted-foreground text-sm">
                {t.tagline}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/kikobatistaa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-card/50 border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:scale-110 transition-transform" aria-hidden="true" />
              </a>
              
              <a 
                href="https://github.com/kikobatistaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-card/50 border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:scale-110 transition-transform" aria-hidden="true" />
              </a>
              
              <a 
                href="mailto:kiko.2205@hotmail.com"
                className="group p-3 rounded-full bg-card/50 border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 shadow-sm"
                aria-label="Send Email"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:scale-110 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              {t.copyright}
            </p>
            <Link 
              to="/privacy" 
              className="text-muted-foreground text-sm hover:text-accent transition-colors"
            >
              {t.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;