import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";
import SectionHeader from "./SectionHeader";

const Education = () => {
  const { language } = useLanguage();
  const t = translations[language].education;
  const ref = useReveal<HTMLElement>();

  return (
    <section id="education" ref={ref} className="py-24 md:py-32">
      <div className="container">
        <SectionHeader index="04" eyebrow={t.eyebrow} title={t.title} />

        <ol className="border-t border-border">
          {t.degrees.map((degree) => (
            <li
              key={degree.school}
              data-reveal
              className="grid gap-x-12 gap-y-4 border-b border-border py-9 md:grid-cols-[180px_1fr]"
            >
              <div className="eyebrow flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:pt-2">
                <span className="text-foreground">{degree.period}</span>
                <span>{degree.location}</span>
              </div>
              <div>
                <h3 className="text-display-md">{degree.degree}</h3>
                <p className="mt-2 font-mono text-sm text-gold">{degree.school}</p>
                <p className="mt-4 max-w-[64ch] text-muted-foreground">{degree.note}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-12 md:grid-cols-3">
          <div data-reveal>
            <p className="eyebrow mb-5">{t.certificationsTitle}</p>
            <ul className="space-y-3 text-foreground/85">
              {t.certifications.map((item) => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-5">{t.honorsTitle}</p>
            <ul className="space-y-3 text-foreground/85">
              {t.honors.map((item) => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex gap-4">
                <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-gold" />
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.publicationLabel}
                  </span>
                  <span className="italic">{t.publication}</span>
                </span>
              </li>
            </ul>
          </div>
          <div data-reveal className="space-y-8">
            <div>
              <p className="eyebrow mb-5">{t.toolkitTitle}</p>
              <dl className="space-y-4 font-mono text-sm">
                <div>
                  <dt className="text-gold">{t.toolkit.finance.label}</dt>
                  <dd className="mt-1 leading-relaxed text-foreground/85">{t.toolkit.finance.items.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="text-gold">{t.toolkit.data.label}</dt>
                  <dd className="mt-1 leading-relaxed text-foreground/85">{t.toolkit.data.items.join(" · ")}</dd>
                </div>
              </dl>
            </div>
            <div>
              <p className="eyebrow mb-4">{t.languagesTitle}</p>
              <ul className="space-y-1 font-mono text-sm text-foreground/85">
                {t.languages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
