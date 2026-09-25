import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";

const Glance = () => {
  const { language } = useLanguage();
  const t = translations[language].glance;
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} aria-label={t.title} className="border-y border-border">
      <div className="container">
        <ul className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {t.items.map((item, i) => (
            <li key={i} data-reveal className="bg-background py-8 pr-6 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0">
              <p className="tabular font-display text-4xl text-foreground md:text-5xl">{item.value}</p>
              <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted-foreground">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Glance;
