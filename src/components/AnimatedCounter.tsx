import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Briefcase, GraduationCap, Globe, FolderOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CounterItemProps {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const CounterItem = ({ target, suffix, label, icon }: CounterItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => setCount(Math.round(obj.value)),
        });
      },
    });

    return () => trigger.kill();
  }, [target]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 py-6 px-4">
      <div className="text-foreground/40 mb-1">{icon}</div>
      <div className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
};

const AnimatedCounter = () => {
  const { language } = useLanguage();

  const stats = [
    {
      target: 3,
      suffix: "+",
      label: language === "en" ? "Years Experience" : language === "es" ? "Años de Experiencia" : "Anos de Experiência",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      target: 4,
      suffix: "",
      label: language === "en" ? "Companies" : language === "es" ? "Empresas" : "Empresas",
      icon: <FolderOpen className="h-5 w-5" />,
    },
    {
      target: 3,
      suffix: "",
      label: language === "en" ? "Languages" : language === "es" ? "Idiomas" : "Idiomas",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      target: 2,
      suffix: "",
      label: language === "en" ? "Degrees" : language === "es" ? "Títulos" : "Graus",
      icon: <GraduationCap className="h-5 w-5" />,
    },
  ];

  return (
    <div className="border-y border-white/5 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat) => (
            <CounterItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCounter;
