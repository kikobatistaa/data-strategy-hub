import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, BookOpen, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useOnScreen } from "@/hooks/useOnScreen";

const Education = () => {
  const { language } = useLanguage();
  const t = translations[language].education;
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, "0px", 0.2);

  const education = [
    {
      school: t.uc3m.school,
      degree: t.uc3m.degree,
      period: t.uc3m.period,
      location: t.uc3m.location,
      icon: GraduationCap,
      focus: t.uc3m.focus,
      highlight: null
    },
    {
      school: t.nova.school,
      degree: t.nova.degree,
      period: t.nova.period,
      location: t.nova.location,
      icon: Award,
      focus: t.nova.focus,
      highlight: t.nova.highlight
    }
  ];

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className={`py-32 bg-background relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
          
          {/* Timeline Layout */}
          <div className="relative">
            {/* Vertical line with gradient */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent md:-translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {education.map((edu, index) => {
                const Icon = edu.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={index}
                    className={`relative flex flex-col md:flex-row gap-8 items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-glow md:-translate-x-1/2 z-10 hidden md:block" />
                    
                    {/* Spacer for two-column layout alignment */}
                    <div className="hidden md:block md:w-1/2" />
                    
                    {/* Content Card */}
                    <Card className="w-full md:w-1/2 border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 group">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="p-3 rounded-xl bg-accent/10 shadow-glow border border-accent/20 group-hover:bg-accent/20 transition-colors duration-300">
                            <Icon className="h-6 w-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <CardTitle className="text-2xl mb-1 font-bold">{edu.degree}</CardTitle>
                                <CardDescription className="text-base font-medium text-foreground/80">
                                  {edu.school}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 text-accent" />
                              <Badge variant="outline" className="border-accent/30 text-accent bg-accent/10">
                                {edu.period}
                              </Badge>
                              <span>{edu.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        {edu.highlight && (
                          <div className="mt-3 px-4 py-2 bg-accent/5 border border-accent/20 rounded-lg">
                            <p className="text-sm text-accent font-medium">{edu.highlight}</p>
                          </div>
                        )}
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Focus Areas</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.focus.map((item, idx) => (
                              <Badge 
                                key={idx} 
                                variant="secondary"
                                className="bg-secondary/50 text-foreground hover:bg-accent/20 hover:text-accent border border-transparent hover:border-accent/30 transition-all"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Relevant Coursework */}
          <div className="mt-20 text-center">
            <Card className="border border-white/10 shadow-card bg-card/30 backdrop-blur-md inline-block">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl font-bold">{t.coursework}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {t.courseworkItems.map((course, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline"
                      className="border-accent/20 text-muted-foreground hover:text-accent hover:border-accent/50 bg-background/50 transition-all"
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;