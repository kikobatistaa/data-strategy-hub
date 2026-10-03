import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { formatBp, formatPercent, formatUsdMillions } from "@/lib/format";
import { cn } from "@/lib/utils";
import { HBars } from "./charts";

const ISSUE_USD_M = 500;
// Case data: the yen went from ¥204/$ (2006) to ¥112/$ (2016), about 6.2% a year.
const HISTORY_MOVE = (Math.pow(204 / 112, 1 / 10) - 1) * 100;

const inputClass =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-2 font-mono text-lg tabular-nums text-foreground focus:border-foreground focus:outline-none";

/**
 * Unhedged yen borrowing vs dollar borrowing (BID case, October 2015 issue).
 * Effective dollar cost of a yen loan = (1 + yen rate) × (1 + yen move) − 1,
 * where a positive move means the yen strengthens against the dollar.
 */
const BorrowingCalculator = () => {
  const { language } = useLanguage();
  const t = translations[language].projectPages.bid.calc;

  const [usdRate, setUsdRate] = useState(7.95);
  const [yenRate, setYenRate] = useState(7.75);
  const [move, setMove] = useState(0);

  const effective = ((1 + yenRate / 100) * (1 + move / 100) - 1) * 100;
  const diffBp = (effective - usdRate) * 100;
  const perYear = (ISSUE_USD_M * diffBp) / 10_000;
  const breakeven = ((1 + usdRate / 100) / (1 + yenRate / 100) - 1) * 100;
  const yenDearer = diffBp > 0.5;
  const yenCheaper = diffBp < -0.5;

  const presets: [string, number][] = [
    [t.presets.none, 0],
    [t.presets.breakeven, Math.round(breakeven * 100) / 100],
    [t.presets.history, Math.round(HISTORY_MOVE * 10) / 10],
    [t.presets.weaker, -5],
  ];

  const parseRate = (value: string, fallback: number) => {
    const n = parseFloat(value.replace(",", "."));
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), 30) : fallback;
  };

  return (
    <div className="border border-border">
      <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
        <label className="block">
          <span className="eyebrow">{t.usdRate}</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.05"
            min="0"
            max="30"
            value={usdRate}
            onChange={(e) => setUsdRate(parseRate(e.target.value, usdRate))}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="eyebrow">{t.yenRate}</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.05"
            min="0"
            max="30"
            value={yenRate}
            onChange={(e) => setYenRate(parseRate(e.target.value, yenRate))}
            className={inputClass}
          />
        </label>

        <div className="md:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="yen-move" className="eyebrow">
              {t.yenMove}
            </label>
            <span className="font-mono text-lg tabular-nums text-foreground">{formatPercent(move, language, 1, true)}</span>
          </div>
          <input
            id="yen-move"
            type="range"
            min={-10}
            max={10}
            step={0.1}
            value={move}
            onChange={(e) => setMove(parseFloat(e.target.value))}
            className="mt-4 w-full accent-[hsl(var(--gold))]"
            aria-valuetext={formatPercent(move, language, 1, true)}
          />
          <div className="mt-1 flex justify-between font-mono text-[11px] text-muted-foreground">
            <span>{t.weakens}</span>
            <span>{t.strengthens}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {presets.map(([label, value]) => (
              <button
                key={label}
                type="button"
                onClick={() => setMove(value)}
                aria-pressed={Math.abs(move - value) < 0.05}
                className={cn(
                  "border px-3 py-1.5 font-mono text-xs transition-colors",
                  Math.abs(move - value) < 0.05
                    ? "border-gold text-gold"
                    : "border-border text-foreground/85 hover:border-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border p-6 md:p-8" aria-live="polite">
        <HBars
          max={Math.max(effective, usdRate, 1)}
          items={[
            { label: t.dollarLoan, value: usdRate, display: formatPercent(usdRate, language) },
            {
              label: t.effectiveYen,
              value: effective,
              display: formatPercent(effective, language),
              highlight: true,
            },
          ]}
        />
        <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">{t.difference}</p>
            <p className={cn("font-mono text-2xl tabular-nums", yenDearer ? "text-foreground" : "text-gold")}>
              {formatBp(diffBp, language, true)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {yenDearer ? t.dearer : yenCheaper ? t.cheaper : t.even}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">{t.perYear}</p>
            <p className="font-mono text-2xl tabular-nums text-foreground">{formatUsdMillions(perYear, language)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.perYearNote}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-border p-6 text-sm leading-relaxed text-muted-foreground md:p-8">
        <p>{t.breakevenNote.replace("{x}", formatPercent(breakeven, language, 2))}</p>
        <p>{t.hedgedNote}</p>
        <p className="font-mono text-xs">{t.method}</p>
      </div>
    </div>
  );
};

export default BorrowingCalculator;
