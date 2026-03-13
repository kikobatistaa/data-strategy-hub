const technologies = [
  "Python", "SQL", "R", "Power BI", "Tableau", "Machine Learning",
  "Statistics", "Econometrics", "Deep Learning", "Data Visualization",
  "Business Intelligence", "Strategic Analysis", "Financial Modeling",
  "Excel", "React", "TypeScript",
];

const Marquee = () => {
  const content = technologies.map((t) => t.toUpperCase()).join(" \u00B7 ");
  const doubled = `${content} \u00B7 ${content} \u00B7 `;

  return (
    <div className="py-6 overflow-hidden select-none border-y border-white/5">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-2xl md:text-4xl font-black text-foreground/[0.04] tracking-widest">
          {doubled}
        </span>
        <span className="text-2xl md:text-4xl font-black text-foreground/[0.04] tracking-widest">
          {doubled}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
