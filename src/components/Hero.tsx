import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { gsap } from "@/lib/gsap";
import { LINKS } from "@/lib/links";
import AnchorLink from "./AnchorLink";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = el.querySelectorAll("[data-hero]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", delay: 0.1 }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative pt-16">
      <div className="container grid min-h-[calc(100svh-4rem)] grid-cols-12 items-center gap-y-14 py-16 md:py-24">
        <div className="col-span-12 lg:col-span-7">
          <p data-hero className="eyebrow mb-8 text-gold">
            {t.eyebrow}
          </p>
          <h1 data-hero className="text-display-xl">
            <span className="block">{t.name[0]}</span>
            <span className="block">{t.name[1]}</span>
          </h1>
          <p data-hero className="mt-6 font-display text-display-md italic text-gold">
            {t.tagline}
          </p>
          <p data-hero className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
            {t.lead}
          </p>
          <div data-hero className="mt-10 flex flex-wrap items-center gap-4">
            <AnchorLink
              to="projects"
              className="inline-flex h-12 items-center bg-primary px-6 font-mono text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-gold"
            >
              {t.ctaWork}
            </AnchorLink>
            <AnchorLink
              to="contact"
              className="inline-flex h-12 items-center border border-border px-6 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground"
            >
              {t.ctaHello}
            </AnchorLink>
          </div>
          <div data-hero className="mt-10 flex items-center gap-7">
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-foreground"
            >
              {t.linkedin} <span aria-hidden>↗</span>
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-foreground"
            >
              {t.github} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        {/* Fact sheet, CV style. */}
        <aside data-hero className="col-span-12 lg:col-span-4 lg:col-start-9" aria-label={t.factsTitle}>
          <p className="eyebrow mb-4">{t.factsTitle}</p>
          <dl className="border-t border-border">
            {t.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-border py-4">
                <dt className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-foreground/90">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
