/* src/components/Skills.tsx */
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code, TrendingUp, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language].skills;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: t.categories.technical,
      icon: Code,
      skills: [
        t.items.python,
        t.items.sql,
        t.items.machineLearning,
        t.items.statistics,
      ],
    },
    {
      title: t.categories.business,
      icon: TrendingUp,
      skills: [
        t.items.businessIntelligence,
        t.items.dataVisualization,
        t.items.strategy,
        t.items.finance,
      ],
    },
    {
      title: t.categories.tools,
      icon: Wrench,
      skills: [
        t.items.powerBI,
        t.items.excel,
        t.items.tableau,
        t.items.marketing,
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

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

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <Card
                  key={categoryIndex}
                  className="border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 p-8"
                  style={{ animationDelay: `${categoryIndex * 150}ms` }}
                >
                  <div className="mb-8">
                    <div className="p-3 rounded-xl bg-accent/10 inline-block mb-4 shadow-glow">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-sm font-bold text-accent">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isVisible ? `${skill.level}%` : "0%",
                              transitionDelay: `${categoryIndex * 150 + skillIndex * 100}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
