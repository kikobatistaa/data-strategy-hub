/* src/components/Experience.tsx */
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Code, BarChart3, GraduationCap, LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useOnScreen } from "@/hooks/useOnScreen";
import { useTiltEffect } from "@/hooks/useTiltEffect";

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  icon: LucideIcon;
  achievements: string[];
  skills: string[];
}

const ExperienceCard = ({ exp, index }: { exp: ExperienceEntry; index: number }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTiltEffect(4);
  const Icon = exp.icon;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)" }}
    >
      <Card 
        className="border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 group"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="p-3 rounded-xl bg-accent/10 shadow-glow border border-accent/20 group-hover:bg-accent/20 transition-colors duration-300">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2 font-bold">{exp.role}</CardTitle>
                <CardDescription className="text-base font-medium">
                  <span className="text-foreground">{exp.company}</span>
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="w-fit px-4 py-1 text-sm border-accent/30 text-accent bg-accent/10">
              {exp.period}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pl-20">
          <ul className="space-y-3 mb-6">
            {exp.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <div className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="text-base leading-relaxed">{achievement}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill, idx) => (
              <Badge 
                key={idx} 
                variant="secondary"
                className="bg-background text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-all"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language].experience;
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, "0px", 0.05);

  const experiences: ExperienceEntry[] = [
    {
      company: t.brainycommerce.company,
      role: t.brainycommerce.role,
      period: t.brainycommerce.period,
      icon: BarChart3,
      achievements: t.brainycommerce.achievements,
      skills: t.brainycommerce.skills
    },
    {
      company: t.netjets.company,
      role: t.netjets.role,
      period: t.netjets.period,
      icon: Briefcase,
      achievements: t.netjets.achievements,
      skills: t.netjets.skills
    },
    {
      company: t.novae.company,
      role: t.novae.role,
      period: t.novae.period,
      icon: Users,
      achievements: t.novae.achievements,
      skills: t.novae.skills
    },
    {
      company: t.happycode.company,
      role: t.happycode.role,
      period: t.happycode.period,
      icon: Code,
      achievements: t.happycode.achievements,
      skills: t.happycode.skills
    },
    {
      company: t.colegio.company,
      role: t.colegio.role,
      period: t.colegio.period,
      icon: GraduationCap,
      achievements: t.colegio.achievements,
      skills: t.colegio.skills
    }
  ];

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className={`py-24 bg-background relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
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
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;