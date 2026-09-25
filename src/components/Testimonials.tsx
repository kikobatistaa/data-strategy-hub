import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";
import SectionHeader from "./SectionHeader";

const Testimonials = () => {
  const { language } = useLanguage();
  const t = translations[language].testimonials;
  const ref = useReveal<HTMLElement>();

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-32">
      <div className="container">
        <SectionHeader index="03" eyebrow={t.eyebrow} title={t.title} className="mb-10 md:mb-14" />
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {t.items.map((item, i) => (
            <figure key={i} data-reveal className="flex flex-col justify-between bg-background p-7 md:p-9">
              <blockquote>
                <span aria-hidden className="block font-display text-5xl leading-none text-gold">
                  “
                </span>
                <p className="mt-2 font-display text-xl italic leading-snug text-foreground md:text-2xl">
                  {item.quote}
                </p>
              </blockquote>
              <figcaption className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="block text-foreground">{item.author}</span>
                <span className="block">{item.org}</span>
                <span className="mt-2 block text-gold-dim">{item.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
