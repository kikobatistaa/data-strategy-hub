import { cn } from "@/lib/utils";

/* Small HTML/CSS charts: no chart library, crisp text at any width, readable by crawlers. */

type HBar = {
  label: string;
  value: number;
  display: string;
  /** Extra text after the label, e.g. a verdict. */
  note?: string;
  highlight?: boolean;
};

export const HBars = ({ items, max, className }: { items: HBar[]; max?: number; className?: string }) => {
  const top = max ?? Math.max(...items.map((item) => Math.abs(item.value)));
  return (
    <ul className={cn("space-y-5", className)}>
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <span className="text-foreground/90">
              {item.label}
              {item.note && <span className="eyebrow ml-3">{item.note}</span>}
            </span>
            <span className="font-mono text-sm tabular-nums text-foreground">{item.display}</span>
          </div>
          <div className="h-2 w-full bg-muted" aria-hidden>
            <div
              className={cn("h-full transition-[width] duration-500", item.highlight ? "bg-gold" : "bg-foreground/60")}
              style={{ width: `${Math.max(1, (Math.abs(item.value) / top) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

type Series = {
  label: string;
  values: number[];
  format: (value: number) => string;
  tone: "gold" | "light";
};

/** Grouped columns with a zero line; negative values hang below it. */
export const Columns = ({
  categories,
  series,
  height = 260,
  caption,
}: {
  categories: string[];
  series: Series[];
  height?: number;
  caption: string;
}) => {
  const all = series.flatMap((s) => s.values);
  const maxPos = Math.max(0, ...all);
  const maxNeg = Math.max(0, ...all.map((v) => -v));
  const span = maxPos + maxNeg || 1;
  const posShare = maxPos / span;

  return (
    <figure>
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2" aria-hidden>
        {series.map((s) => (
          <span key={s.label} className="eyebrow inline-flex items-center gap-2">
            <span className={cn("h-2 w-2", s.tone === "gold" ? "bg-gold" : "bg-foreground/60")} />
            {s.label}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height }} aria-hidden>
        {/* zero line */}
        <div className="absolute inset-x-0 border-t border-foreground/30" style={{ top: `${posShare * 100}%` }} />
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}>
          {categories.map((category, ci) => (
            <div key={category} className="flex h-full justify-center gap-1 px-1 sm:gap-2">
              {series.map((s) => {
                const value = s.values[ci];
                const share = Math.abs(value) / span;
                const negative = value < 0;
                return (
                  <div key={s.label} className="relative h-full w-full max-w-[28px]">
                    <div
                      className={cn("absolute inset-x-0", s.tone === "gold" ? "bg-gold" : "bg-foreground/60")}
                      style={
                        negative
                          ? { top: `${posShare * 100}%`, height: `${share * 100}%` }
                          : { bottom: `${(1 - posShare) * 100}%`, height: `${Math.max(share * 100, 0.6)}%` }
                      }
                    />
                    {/* Hidden on phones: the labels collide there, and the table below has the figures. */}
                    <span
                      className="absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tabular-nums text-muted-foreground sm:block"
                      style={
                        negative
                          ? { top: `calc(${(posShare + share) * 100}% + 4px)` }
                          : { bottom: `calc(${((1 - posShare) + share) * 100}% + 4px)` }
                      }
                    >
                      {s.format(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 grid border-t border-border pt-3" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }} aria-hidden>
        {categories.map((category) => (
          <span key={category} className="eyebrow text-center">
            {category}
          </span>
        ))}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
};
