import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";
import SectionHeader from "./SectionHeader";

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language].experience;
  const ref = useReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="py-24 md:py-32">
      <div className="container">
        <SectionHeader index="01" eyebrow={t.eyebrow} title={t.title} />

        <ol className="border-t border-border">
          {t.roles.map((role, i) => (
            <li
              key={role.id}
              data-reveal
              className="grid gap-x-12 gap-y-5 border-b border-border py-10 md:grid-cols-[180px_1fr] md:py-12"
            >
              <div className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 md:flex-col md:items-start md:pt-2">
                {i === 0 && (
                  <span className="flex items-center gap-2 text-gold">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {t.nowLabel}
                  </span>
                )}
                <span className="text-foreground">{role.period}</span>
                <span>{role.location}</span>
              </div>
              <div>
                <h3 className="text-display-md">{role.role}</h3>
                <p className="mt-2 font-mono text-sm text-gold">{role.company}</p>
                <p className="mt-5 max-w-[64ch] text-muted-foreground">{role.summary}</p>
                <ul className="mt-6 space-y-3">
                  {role.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-4 text-[15px] leading-relaxed text-foreground/85">
                      <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-gold" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-14">
          <p className="eyebrow mb-5">{t.earlierLabel}</p>
          <ul className="border-t border-border">
            {t.earlier.map((entry) => (
              <li
                key={entry.id}
                className="grid gap-x-12 gap-y-1 border-b border-border py-5 md:grid-cols-[180px_1fr]"
              >
                <span className="eyebrow md:pt-1">{entry.period}</span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-medium text-foreground">{entry.role}</span>
                  <span className="font-mono text-sm text-gold">{entry.company}</span>
                  <span className="basis-full text-sm text-muted-foreground">{entry.summary}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
