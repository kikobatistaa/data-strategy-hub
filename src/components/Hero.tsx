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
      const portrait = el.querySelector("[data-portrait]");
      if (portrait) {
        gsap.fromTo(
          portrait,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.inOut", delay: 0.25 }
        );
      }
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
            <span className="block">{t.headline[0]}</span>
            <span className="block italic text-gold">{t.headline[1]}</span>
          </h1>
          <p data-hero className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
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

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <figure className="relative mx-auto max-w-[300px] sm:max-w-[340px] lg:max-w-none">
            <div data-portrait className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <img
                src="/profile.jpg"
                alt={t.portraitAlt}
                width={1024}
                height={1280}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover grayscale contrast-[1.05]"
              />
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-gold/50"
            />
            <figcaption className="eyebrow mt-7">{t.portraitCaption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
