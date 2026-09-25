import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, type ProjectId, type Translation } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";
import SectionHeader from "./SectionHeader";

const ASSETS = {
  bid: { pdf: "/report_BID.pdf" },
  bank: { pdf: "/Bank_Profitability_Report.pdf" },
  volkswagen: { pdf: "/Strategy_VW.pdf" },
  spark: {
    github: "https://github.com/kikobatistaa/Using-Databricks-to-Predict-Traffic-and-Analyse-Spotify-Playlists",
    traffic: "/projects/spark-analytics/traffic",
    spotify: "/projects/spark-analytics/spotify",
  },
} as const;

const ORDER: ProjectId[] = ["bid", "bank", "volkswagen", "spark"];

const actionClass = "eyebrow inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-gold";

type ProjectsCopy = Translation["projects"];
type ProjectItem = ProjectsCopy["items"][ProjectId];

const CaseStudyDialog = ({
  item,
  copy,
  pdf,
}: {
  item: ProjectItem;
  copy: ProjectsCopy;
  pdf?: string;
}) => {
  const cs = item.caseStudy;
  if (!cs) return null;
  const blocks: [string, string][] = [
    [copy.sections.challenge, cs.challenge],
    [copy.sections.approach, cs.approach],
    [copy.sections.contribution, cs.contribution],
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={actionClass}>
          {copy.actions.caseStudy} <span aria-hidden>→</span>
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] max-w-2xl flex-col gap-0 rounded-none border-border bg-background p-0">
        <DialogHeader className="space-y-0 border-b border-border px-6 py-6 text-left md:px-8">
          <p className="eyebrow mb-3">{item.category}</p>
          <DialogTitle className="pr-8 font-display text-2xl font-normal leading-tight md:text-3xl">
            {cs.title}
          </DialogTitle>
          <DialogDescription className="sr-only">{item.summary}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-8 px-6 py-8 md:px-8">
            {blocks.map(([label, text]) => (
              <div key={label}>
                <p className="eyebrow mb-3">{label}</p>
                <p className="whitespace-pre-line leading-relaxed text-foreground/85">{text}</p>
              </div>
            ))}
            <div className="border border-gold/40 p-5">
              <p className="eyebrow mb-3 text-gold">{copy.sections.recommendation}</p>
              <p className="font-display text-xl leading-snug text-foreground">{cs.recommendation}</p>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{cs.credits}</p>
          </div>
        </ScrollArea>
        {pdf && (
          <div className="border-t border-border px-6 py-5 md:px-8">
            <a href={pdf} target="_blank" rel="noopener noreferrer" className={actionClass}>
              {copy.actions.report} <span aria-hidden>↗</span>
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const ref = useReveal<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32">
      <div className="container">
        <SectionHeader index="02" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {ORDER.map((id, i) => {
            const item = t.items[id];
            const assets = ASSETS[id];
            return (
              <article
                key={id}
                data-reveal
                className="flex flex-col bg-background p-7 transition-colors duration-300 hover:bg-card md:p-10"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                  <span className="eyebrow text-gold">{item.mark}</span>
                </div>
                <p className="eyebrow mt-10">{item.category}</p>
                <h3 className="mt-3 text-display-md">{item.title}</h3>
                <p className="mt-4 max-w-[52ch] text-muted-foreground">{item.summary}</p>
                <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
                  {item.meta}
                  <span className="mx-2 text-border">|</span>
                  {item.tags.join(" · ")}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6">
                  {"pdf" in assets ? (
                    <>
                      <CaseStudyDialog item={item} copy={t} pdf={assets.pdf} />
                      <a href={assets.pdf} target="_blank" rel="noopener noreferrer" className={actionClass}>
                        {t.actions.report} <span aria-hidden>↗</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a href={assets.github} target="_blank" rel="noopener noreferrer" className={actionClass}>
                        {t.actions.github} <span aria-hidden>↗</span>
                      </a>
                      <Link to={assets.traffic} className={actionClass}>
                        {t.actions.notebookTraffic} <span aria-hidden>→</span>
                      </Link>
                      <Link to={assets.spotify} className={actionClass}>
                        {t.actions.notebookSpotify} <span aria-hidden>→</span>
                      </Link>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
