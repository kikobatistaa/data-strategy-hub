import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSmoothScroll } from "./SmoothScroll";
import LanguageSelector from "./LanguageSelector";
import Footer from "./Footer";

/* Building blocks shared by the long-form pages (thesis, project write-ups). */

export const DetailShell = ({
  back,
  docTitle,
  children,
}: {
  back: string;
  docTitle: string;
  children: React.ReactNode;
}) => {
  const ref = useReveal<HTMLElement>();
  const { lenis } = useSmoothScroll();

  // Client-side navigation keeps the previous scroll position; these pages start at the top.
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = `${docTitle} | Francisco Cordeiro Batista`;
    return () => {
      document.title = previous;
    };
  }, [docTitle]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-full items-center justify-between">
          <Link
            to="/#projects"
            className="eyebrow inline-flex items-center gap-2 text-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span>{back}</span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      <main ref={ref} className="container pb-24 pt-32 md:pt-40">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export const PageTitle = ({
  eyebrow,
  title,
  subtitle,
  tagline,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tagline: string;
}) => (
  <div data-reveal className="max-w-4xl">
    <p className="eyebrow mb-6">{eyebrow}</p>
    <h1 className="text-balance text-display-xl">{title}</h1>
    <p className="mt-4 max-w-[34ch] text-balance font-display text-display-md text-foreground/90">{subtitle}</p>
    <p className="mt-8 max-w-[48ch] font-display text-2xl italic text-gold md:text-3xl">{tagline}</p>
  </div>
);

export const FactSheet = ({ items }: { items: { label: string; value: string }[] }) => (
  <dl
    data-reveal
    className="mb-6 mt-14 grid grid-cols-2 border-y border-border md:mt-20 md:grid-cols-4 md:divide-x md:divide-border"
  >
    {items.map((item) => (
      <div key={item.label} className="py-6 pr-6 md:px-6 md:first:pl-0">
        <dt className="eyebrow mb-2">{item.label}</dt>
        <dd className="text-foreground/90">{item.value}</dd>
      </div>
    ))}
  </dl>
);

export const Block = ({
  index,
  title,
  id,
  children,
}: {
  index: string;
  title: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <section id={id} data-reveal className="grid gap-6 border-t border-border py-12 md:grid-cols-12 md:gap-10 md:py-16">
    <h2 className="eyebrow md:col-span-3">
      <span className="text-gold">{index}</span>
      <span className="mx-2 text-border">/</span>
      {title}
    </h2>
    <div className="min-w-0 md:col-span-9">{children}</div>
  </section>
);

export const Prose = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed text-foreground/85">
    {paragraphs.map((paragraph) => (
      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
    ))}
  </div>
);

export const NumberGrid = ({ items }: { items: { value: string; label: string }[] }) => (
  <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <li key={item.value + item.label} className="bg-background p-6">
        <p className="font-mono text-2xl tabular-nums text-foreground md:text-3xl">{item.value}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
      </li>
    ))}
  </ul>
);

export const Findings = ({ items }: { items: { title: string; text: string }[] }) => (
  <ol className="border-t border-border">
    {items.map((item, i) => (
      <li key={item.title} className="grid gap-3 border-b border-border py-7 md:grid-cols-[56px_1fr]">
        <span className="font-mono text-sm text-gold">0{i + 1}</span>
        <div>
          <h3 className="font-display text-2xl leading-snug">{item.title}</h3>
          <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">{item.text}</p>
        </div>
      </li>
    ))}
  </ol>
);

export const PdfCta = ({ href, label, meta, note }: { href: string; label: string; meta: string; note: string }) => (
  <div data-reveal className="flex flex-col gap-6 border-t border-border pt-12 md:flex-row md:items-center md:justify-between">
    <div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center bg-primary px-6 font-mono text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-gold"
      >
        {label} <span className="ml-2" aria-hidden>↗</span>
      </a>
      <p className="eyebrow mt-4">{meta}</p>
    </div>
    <p className="max-w-[44ch] font-mono text-xs leading-relaxed text-muted-foreground">{note}</p>
  </div>
);
