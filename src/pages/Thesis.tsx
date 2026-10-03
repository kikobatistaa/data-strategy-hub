import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";
import { useSmoothScroll } from "@/components/SmoothScroll";
import LanguageSelector from "@/components/LanguageSelector";
import Footer from "@/components/Footer";

const PDF = "/Compliance_AI_Thesis.pdf";

const Block = ({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section data-reveal className="grid gap-6 border-t border-border py-12 md:grid-cols-12 md:gap-10 md:py-16">
    <p className="eyebrow md:col-span-3">
      <span className="text-gold">{index}</span>
      <span className="mx-2 text-border">/</span>
      {title}
    </p>
    <div className="md:col-span-9">{children}</div>
  </section>
);

const Thesis = () => {
  const { language } = useLanguage();
  const t = translations[language].thesis;
  const ref = useReveal<HTMLElement>();
  const { lenis } = useSmoothScroll();

  // Client-side navigation keeps the previous scroll position; this page starts at the top.
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = `${t.title}: ${t.subtitle} | Francisco Cordeiro Batista`;
    return () => {
      document.title = previous;
    };
  }, [t.title, t.subtitle]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-full items-center justify-between">
          <Link
            to="/#projects"
            className="eyebrow inline-flex items-center gap-2 text-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span>{t.back}</span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      <main ref={ref} className="container pb-24 pt-32 md:pt-40">
        {/* Title */}
        <div data-reveal className="max-w-4xl">
          <p className="eyebrow mb-6">{t.eyebrow}</p>
          <h1 className="text-display-xl">{t.title}</h1>
          <p className="mt-4 max-w-[30ch] font-display text-display-md text-foreground/90">{t.subtitle}</p>
          <p className="mt-8 font-display text-2xl italic text-gold md:text-3xl">{t.tagline}</p>
        </div>

        {/* Fact sheet */}
        <dl data-reveal className="mt-14 grid grid-cols-2 border-y border-border md:mt-20 md:grid-cols-4 md:divide-x md:divide-border">
          {t.meta.map((item) => (
            <div key={item.label} className="py-6 pr-6 md:px-6 md:first:pl-0">
              <dt className="eyebrow mb-2">{item.label}</dt>
              <dd className="text-foreground/90">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <Block index="01" title={t.abstractTitle}>
            <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed text-foreground/85">
              {t.abstract.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Block>

          <Block index="02" title={t.numbersTitle}>
            <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {t.numbers.map((item) => (
                <li key={item.value} className="bg-background p-6">
                  <p className="font-mono text-2xl tabular-nums text-foreground md:text-3xl">{item.value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block index="03" title={t.findingsTitle}>
            <ol className="border-t border-border">
              {t.findings.map((item, i) => (
                <li key={item.title} className="grid gap-3 border-b border-border py-7 md:grid-cols-[56px_1fr]">
                  <span className="font-mono text-sm text-gold">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-snug">{item.title}</h3>
                    <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block index="04" title={t.structureTitle}>
            <div className="grid gap-12 lg:grid-cols-12">
              <ol className="border-t border-border lg:col-span-7">
                {t.chapters.map((chapter, i) => (
                  <li key={chapter} className="grid grid-cols-[56px_1fr] gap-3 border-b border-border py-4">
                    <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                    <span className="text-foreground/90">{chapter}</span>
                  </li>
                ))}
              </ol>
              <div className="lg:col-span-5">
                <p className="eyebrow mb-5">{t.frameworksTitle}</p>
                <ul className="flex flex-wrap gap-2">
                  {t.frameworks.map((framework) => (
                    <li key={framework} className="border border-border px-3 py-1.5 font-mono text-xs text-foreground/85">
                      {framework}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Block>
        </div>

        {/* PDF */}
        <div data-reveal className="flex flex-col gap-6 border-t border-border pt-12 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center bg-primary px-6 font-mono text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-gold"
            >
              {t.readPdf} <span className="ml-2" aria-hidden>↗</span>
            </a>
            <p className="eyebrow mt-4">{t.pages}</p>
          </div>
          <p className="max-w-[44ch] font-mono text-xs leading-relaxed text-muted-foreground">{t.note}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Thesis;
