import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

const SectionHeader = ({ index, eyebrow, title, subtitle, className }: SectionHeaderProps) => (
  <div data-reveal className={cn("mb-14 md:mb-20", className)}>
    <p className="eyebrow mb-5">
      <span className="text-gold">{index}</span>
      <span className="mx-2 text-border">/</span>
      {eyebrow}
    </p>
    <h2 className="text-display-lg">{title}</h2>
    {subtitle && <p className="mt-5 max-w-[60ch] text-lg text-muted-foreground">{subtitle}</p>}
  </div>
);

export default SectionHeader;
