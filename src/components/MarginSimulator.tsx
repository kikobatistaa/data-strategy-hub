import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { formatDecimal, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * What-if on the bank-branch optimal model (log-log OLS): with elasticities β,
 * a change x_j in each driver moves the predicted margin by Π (1 + x_j)^β_j − 1.
 */
const MarginSimulator = () => {
  const { language } = useLanguage();
  const page = translations[language].projectPages.bank;
  const t = page.sim;
  const [changes, setChanges] = useState<number[]>(() => page.drivers.map(() => 0));

  const factor = page.drivers.reduce((acc, driver, i) => acc * Math.pow(1 + changes[i] / 100, driver.beta), 1);
  const result = (factor - 1) * 100;
  const touched = changes.some((c) => c !== 0);

  const setOne = (index: number, value: number) =>
    setChanges((prev) => prev.map((c, i) => (i === index ? value : c)));

  return (
    <div className="border border-border">
      <ul className="divide-y divide-border">
        {page.drivers.map((driver, i) => {
          const id = `driver-${i}`;
          return (
            <li key={driver.name} className="grid gap-3 p-6 sm:grid-cols-[1fr_auto] sm:items-center md:px-8">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={id} className="text-foreground/90">
                    {driver.name}
                  </label>
                  <span className="font-mono text-sm tabular-nums text-foreground sm:hidden">
                    {formatPercent(changes[i], language, 0, true)}
                  </span>
                </div>
                <input
                  id={id}
                  type="range"
                  min={-50}
                  max={50}
                  step={5}
                  value={changes[i]}
                  onChange={(e) => setOne(i, parseFloat(e.target.value))}
                  className="mt-3 w-full accent-[hsl(var(--gold))]"
                  aria-valuetext={formatPercent(changes[i], language, 0, true)}
                />
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  β = {formatDecimal(driver.beta, language, 3)}
                </p>
              </div>
              <span className="hidden w-16 text-right font-mono text-sm tabular-nums text-foreground sm:block">
                {formatPercent(changes[i], language, 0, true)}
              </span>
            </li>
          );
        })}
      </ul>
      <div
        className="flex flex-col gap-4 border-t border-border p-6 sm:flex-row sm:items-end sm:justify-between md:p-8"
        aria-live="polite"
      >
        <div>
          <p className="eyebrow mb-2">{t.result}</p>
          <p className={cn("font-mono text-4xl tabular-nums", result < 0 ? "text-foreground" : "text-gold")}>
            {formatPercent(result, language, 1, true)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setChanges(page.drivers.map(() => 0))}
          disabled={!touched}
          className="h-10 border border-border px-4 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground disabled:opacity-40"
        >
          {t.reset}
        </button>
      </div>
      <p className="border-t border-border p-6 font-mono text-xs leading-relaxed text-muted-foreground md:px-8">{t.note}</p>
    </div>
  );
};

export default MarginSimulator;
