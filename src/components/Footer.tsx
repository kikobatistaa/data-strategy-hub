import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { LINKS } from "@/lib/links";

const linkClass = "eyebrow transition-colors hover:text-foreground";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl tracking-tight text-foreground">Francisco Cordeiro Batista</p>
            <p className="eyebrow mt-2">{t.tagline}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <li>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.linkedin} <span aria-hidden>↗</span>
              </a>
            </li>
            <li>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.github} <span aria-hidden>↗</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${LINKS.email}`} className={linkClass}>
                {t.email}
              </a>
            </li>
            <li>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.cv}
              </a>
            </li>
            <li>
              <Link to="/privacy" className={linkClass}>
                {t.privacy}
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground md:flex-row md:justify-between">
          <p>© 2026 Francisco Cordeiro Batista. {t.rights}</p>
          <p>{t.colophon}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
