import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Francisco Cordeiro Batista</h3>
              <p className="text-primary-foreground/80 text-sm">
                Data Science • Business Strategy • International Mindset
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/kikobatistaa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              
              <a 
                href="https://github.com/kikobatistaa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              
              <a 
                href="mailto:kiko.2205@hotmail.com"
                className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/70 text-sm">
              © 2025 Francisco Cordeiro Batista. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
