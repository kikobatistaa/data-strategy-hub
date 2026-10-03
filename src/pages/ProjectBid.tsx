import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { formatPercent } from "@/lib/format";
import { HBars } from "@/components/charts";
import BorrowingCalculator from "@/components/BorrowingCalculator";
import {
  Block,
  DetailShell,
  FactSheet,
  NumberGrid,
  PageTitle,
  PdfCta,
  Prose,
} from "@/components/DetailPage";

const PDF = "/report_BID.pdf";

const ProjectBid = () => {
  const { language } = useLanguage();
  const common = translations[language].projectPages;
  const t = common.bid;

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

      <Block index="03" title={t.parityTitle}>
        <p className="mb-10 max-w-[64ch] text-muted-foreground">{t.parityIntro}</p>
        <HBars
          items={t.parity.map((p) => ({
            label: p.name,
            note: p.verdict,
            value: p.sd,
            display: formatPercent(p.sd, language),
            highlight: p.holds,
          }))}
        />
        <p className="mt-10 max-w-[64ch] font-display text-xl leading-snug text-foreground md:text-2xl">
          {t.parityTakeaway}
        </p>
      </Block>

      <Block index="04" title={t.calc.title} id="calculator">
        <p className="mb-10 max-w-[64ch] text-muted-foreground">{t.calc.intro}</p>
        <BorrowingCalculator />
      </Block>

      <Block index="05" title={t.recommendationTitle}>
        <Prose paragraphs={t.recommendation} />
      </Block>

      <Block index="06" title={common.teamLabel}>
        <p className="max-w-[64ch] text-foreground/90">{t.team}</p>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">{t.myPart}</p>
      </Block>

      <PdfCta href={PDF} label={common.readPdf} meta={t.pdfMeta} note={common.note} />
    </DetailShell>
  );
};

export default ProjectBid;
