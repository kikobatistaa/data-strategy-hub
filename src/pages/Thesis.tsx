import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { formatEurCompact, formatEurFull } from "@/lib/format";
import { Columns } from "@/components/charts";
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

const PDF = "/Compliance_AI_Thesis.pdf";

// Base case, EUR (thesis Table 7.2 and the cash flow statement).
const FINANCIALS = {
  revenue: [49_276, 308_772, 989_963, 2_134_787, 3_708_519],
  ebitda: [-181_049, -189_228, 88_963, 606_787, 1_453_519],
  netIncome: [-185_549, -199_228, 77_963, 594_787, 1_435_519],
  cash: [219_857, 30_216, 125_885, 735_475, 2_177_571],
};

const Thesis = () => {
  const { language } = useLanguage();
  const t = translations[language].thesis;
  const years = FINANCIALS.revenue.map((_, i) => `${t.yearShort}${i + 1}`);
  const compact = (value: number) => formatEurCompact(value, language);

  const rows: [string, number[]][] = [
    [t.revenueLabel, FINANCIALS.revenue],
    [t.ebitdaLabel, FINANCIALS.ebitda],
    [t.netIncomeLabel, FINANCIALS.netIncome],
    [t.cashLabel, FINANCIALS.cash],
  ];

  return (
    <DetailShell back={t.back} docTitle={`${t.title}: ${t.subtitle}`}>
      <PageTitle eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} tagline={t.tagline} />
      <FactSheet items={t.meta} />

      <Block index="01" title={t.abstractTitle}>
        <Prose paragraphs={t.abstract} />
      </Block>

      <Block index="02" title={t.numbersTitle}>
        <NumberGrid items={t.numbers} />
      </Block>

      <Block index="03" title={t.financialsTitle}>
        <p className="mb-10 max-w-[64ch] text-muted-foreground">{t.financialsIntro}</p>
        <Columns
          categories={years}
          caption={t.chartCaption}
          series={[
            { label: t.revenueLabel, values: FINANCIALS.revenue, format: compact, tone: "light" },
            { label: t.netIncomeLabel, values: FINANCIALS.netIncome, format: compact, tone: "gold" },
          ]}
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse font-mono text-sm tabular-nums">
            <caption className="eyebrow mb-4 text-left">{t.tableCaption}</caption>
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th scope="col" className="py-3 pr-4 text-left font-normal" />
                {years.map((year) => (
                  <th key={year} scope="col" className="py-3 pl-4 text-right font-normal">
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, values]) => (
                <tr key={label} className="border-b border-border">
                  <th scope="row" className="py-3 pr-4 text-left font-sans font-normal text-foreground/90">
                    {label}
                  </th>
                  {values.map((value, i) => (
                    <td key={i} className={value < 0 ? "py-3 pl-4 text-right text-muted-foreground" : "py-3 pl-4 text-right text-foreground"}>
                      {formatEurFull(value, language)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-[64ch] font-mono text-xs leading-relaxed text-muted-foreground">{t.financialsNote}</p>
      </Block>

      <Block index="04" title={t.findingsTitle}>
        <Findings items={t.findings} />
      </Block>

      <Block index="05" title={t.structureTitle}>
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

      <PdfCta href={PDF} label={t.readPdf} meta={t.pages} note={t.note} />
    </DetailShell>
  );
};

export default Thesis;
