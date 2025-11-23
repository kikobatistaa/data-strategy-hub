import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Globe, Brain } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
          </div>
          
          <Card className="shadow-card border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardContent className="pt-8 space-y-6">
              <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
                <p className="text-lg">
                  I'm a data-driven strategist bridging the gap between technical analytics and business impact. 
                  My journey began with a <span className="font-semibold text-foreground">BSc in Data Science from NOVA IMS</span>, 
                  where I developed a strong foundation in statistical modeling, machine learning, and programming.
                </p>
                
                <p className="text-lg">
                  Currently pursuing a <span className="font-semibold text-foreground">Master in Management at Universidad Carlos III de Madrid (UC3M)</span>, 
                  I'm expanding my strategic toolkit to translate complex quantitative insights into actionable business strategies 
                  that drive measurable results.
                </p>
                
                <p className="text-lg">
                  My international mindset, shaped by fluency in <span className="font-semibold text-foreground">Portuguese, Spanish, and English</span>, 
                  enables me to collaborate effectively across diverse teams and markets. I thrive at the intersection of data science 
                  and strategy, where analytical rigor meets business intuition.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/30">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Education</h3>
                    <p className="text-sm text-muted-foreground">NOVA IMS + UC3M</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/30">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Expertise</h3>
                    <p className="text-sm text-muted-foreground">Data + Strategy</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/30">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Languages</h3>
                    <p className="text-sm text-muted-foreground">PT, ES, EN</p>
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
