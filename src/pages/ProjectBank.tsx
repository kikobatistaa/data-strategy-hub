import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { formatDecimal } from "@/lib/format";
import { HBars } from "@/components/charts";
import MarginSimulator from "@/components/MarginSimulator";
import {
  Block,
  DetailShell,
  FactSheet,
  Findings,
  NumberGrid,
  PageTitle,
  PdfCta,
  Prose,
} from "@/components/DetailPage";

const PDF = "/Bank_Profitability_Report.pdf";

const ProjectBank = () => {
  const { language } = useLanguage();
  const common = translations[language].projectPages;
  const t = common.bank;

  return (
    <DetailShell back={common.back} docTitle={t.title}>
      <PageTitle eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} tagline={t.tagline} />
      <FactSheet items={t.meta} />

      <Block index="01" title={t.briefTitle}>
        <Prose paragraphs={t.brief} />
      </Block>

      <Block index="02" title={t.numbersTitle}>
        <NumberGrid items={t.numbers} />
      </Block>

      <Block index="03" title={t.driversTitle}>
        <p className="mb-10 max-w-[64ch] text-muted-foreground">{t.driversIntro}</p>
        <HBars
          items={t.drivers.map((d, i) => ({
            label: d.name,
            value: d.beta,
            display: formatDecimal(d.beta, language, 3),
            highlight: i === 0,
          }))}
        />
        <p className="mt-8 font-mono text-xs leading-relaxed text-muted-foreground">{t.driversNote}</p>
      </Block>

      <Block index="04" title={t.sim.title} id="simulator">
        <p className="mb-10 max-w-[64ch] text-muted-foreground">{t.sim.intro}</p>
        <MarginSimulator />
      </Block>

      <Block index="05" title={t.findingsTitle}>
        <Findings items={t.findings} />
      </Block>

      <Block index="06" title={t.bonusTitle}>
        <Prose paragraphs={t.bonus} />
      </Block>

      <Block index="07" title={t.nextTitle}>
        <ol className="max-w-[68ch] space-y-4">
          {t.next.map((step, i) => (
            <li key={step} className="grid grid-cols-[40px_1fr] gap-3 leading-relaxed text-foreground/85">
              <span className="font-mono text-sm text-gold">0{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block index="08" title={common.teamLabel}>
        <p className="max-w-[64ch] text-foreground/90">{t.team}</p>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">{t.myPart}</p>
      </Block>

      <PdfCta href={PDF} label={common.readPdf} meta={t.pdfMeta} note={common.note} />
    </DetailShell>
  );
};

export default ProjectBank;
