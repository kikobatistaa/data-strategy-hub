import { Card, CardContent } from "@/components/ui/card";
import { Globe, Brain } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
          </div>
          
          <Card className="border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardContent className="pt-8 space-y-6">
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  I'm a data-driven strategist bridging the gap between technical analytics and business impact. 
                  My journey began with strong foundation in statistical modeling, machine learning, and programming.
                </p>
                
                <p className="text-lg">
                  I specialize in translating complex quantitative insights into actionable business strategies 
                  that drive measurable results.
                </p>
                
                <p className="text-lg">
                  My international mindset, shaped by fluency in <span className="font-semibold text-foreground">Portuguese, Spanish, and English</span>, 
                  enables me to collaborate effectively across diverse teams and markets. I thrive at the intersection of data science 
                  and strategy, where analytical rigor meets business intuition.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Expertise</h3>
                    <p className="text-sm text-muted-foreground">Data Science & Strategy</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Languages</h3>
                    <p className="text-sm text-muted-foreground">PT, ES, EN (Fluent)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Experience</h3>
                    <p className="text-sm text-muted-foreground">Analyst & Entrepreneur</p>
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