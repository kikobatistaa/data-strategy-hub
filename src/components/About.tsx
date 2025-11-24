import { Card, CardContent } from "@/components/ui/card";
import { Globe, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  // Helper function to render text with <strong> tags
  const renderText = (text: string) => {
    const parts = text.split(/<strong>|<\/strong>/);
    return parts.map((part, index) => {
      // Odd indices are the content inside <strong> tags
      if (index % 2 === 1) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section id="about" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
          </div>
          
          <Card className="border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardContent className="pt-8 space-y-6">
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p className="text-lg">{renderText(t.p1)}</p>
                <p className="text-lg">{renderText(t.p2)}</p>
                <p className="text-lg">{renderText(t.p3)}</p>
                <p className="text-lg">{renderText(t.p4)}</p>
                <p className="text-lg">{renderText(t.p5)}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.expertise}</h3>
                    <p className="text-sm text-muted-foreground">{t.expertiseDesc}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.languagesTitle}</h3>
                    <p className="text-sm text-muted-foreground">{t.languagesDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.experience}</h3>
                    <p className="text-sm text-muted-foreground">{t.experienceDesc}</p>
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
