import { Button } from "@/components/ui/button";
import { Download, Mail, Linkedin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoMnYtMmgtMnYtMmgtMnYyaC0ydjJoMnptLTQgMHYyaC0ydjJoLTJ2MmgydjJoMnYiaDJ2LTJoMnYtMmgydi0yaC0ydi0yaC0ydi0yaC0yem0wIDBoMnYtMmgydi0iaC0ydi0iaC0ydjJoLTJ2MmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-card/50 backdrop-blur-md rounded-full border border-border/50 shadow-sm">
              <p className="text-muted-foreground text-sm font-medium tracking-wide">
                BSc Data Science | Master in Management
              </p>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-foreground leading-tight tracking-tight">
            Bridging Data Science &{" "}
            <span className="bg-gradient-to-r from-accent via-purple-400 to-accent bg-clip-text text-transparent">
              Business Strategy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transforming complex data into actionable insights that drive strategic business decisions and measurable impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            {/* 1. Download CV Button (Primary Color, Linked to CV.pdf) */}
            <Button 
              asChild /* Usado para renderizar o elemento <a> como um botão */
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-bold group border border-primary/50"
            >
              {/* O elemento <a> com os atributos essenciais */}
              <a href="/CV.pdf" download="Francisco_Batista_CV.pdf">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download CV
              </a>
            </Button>
            
            {/* 2. Contact Me Button (Gradient CTA) */}
            <Button 
              asChild /* Usado para renderizar o elemento <a> como um botão */
              size="lg" 
              variant="outline"
              // CLASSE NOVA: bg-gradient-cta definida em index.css (Roxo-Preto)
              className="border-2 border-white/20 bg-gradient-cta text-white hover:bg-accent/80 hover:text-white hover:border-accent/50 backdrop-blur-sm px-8 py-6 text-lg font-bold shadow-lg transition-all duration-300"
            >
              <a href="mailto:kiko.2205@hotmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
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
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-primary/70 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;