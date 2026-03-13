/* src/components/Skills.tsx */
import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, TrendingUp, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language].skills;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const { onMouseMove } = useMouseGlow();

  const skillCategories = [
    {
      title: t.categories.technical,
      icon: Code,
      skills: [t.items.python.name, t.items.sql.name, t.items.machineLearning.name, t.items.statistics.name],
    },
    {
      title: t.categories.business,
      icon: TrendingUp,
      skills: [t.items.businessIntelligence.name, t.items.dataVisualization.name, t.items.strategy.name, t.items.finance.name],
    },
    {
      title: t.categories.tools,
      icon: Wrench,
      skills: [t.items.powerBI.name, t.items.excel.name, t.items.tableau.name, t.items.marketing.name],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        );
      }

      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".skill-card");
        const isMobile = window.innerWidth < 1024;

        if (isMobile) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
              scrollTrigger: { trigger: cardsContainerRef.current, start: "top 80%" },
            }
          );
        } else {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              end: "+=800",
              pin: true,
              scrub: 0.5,
            },
          });

          cards.forEach((card, i) => {
            tl.fromTo(
              card,
              { opacity: 0, rotateY: 60, scale: 0.8 },
              { opacity: 1, rotateY: 0, scale: 1, duration: 1, ease: "power3.out" },
              i * 0.3
            );
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">{t.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          <div ref={cardsContainerRef} className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <Card
                  key={categoryIndex}
                  className="skill-card card-mouse-glow border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 p-8"
                  onMouseMove={onMouseMove}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="mb-8">
                    <div className="p-3 rounded-xl bg-accent/10 inline-block mb-4 shadow-glow">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-base px-4 py-2 bg-secondary/80 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 border border-border/30"
                      >
                        {skill}
                      </Badge>
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
