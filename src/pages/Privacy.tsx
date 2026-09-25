import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import LanguageSelector from "@/components/LanguageSelector";

const PrivacyContent = () => {
  const { language } = useLanguage();
  const t = translations[language].privacy;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex h-full items-center justify-between">
          <Link 
            to="/" 
            className="eyebrow inline-flex items-center gap-2 text-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span>{t.backToHome}</span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-3xl pt-32 pb-20">
        <article className="animate-fade-in">
          <h1 className="text-display-lg mb-4">{t.title}</h1>
          <p className="eyebrow mb-12">{t.lastUpdated}</p>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.introTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.introText}</p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.collectTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.collectText}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {t.collectItems.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.useTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.useText}</p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.thirdPartyTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.thirdPartyText}</p>
            
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Formspree</h3>
                <p className="text-muted-foreground">{t.formspreeText}</p>
                <a 
                  href="https://formspree.io/legal/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  {t.formspreeLink}
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Google reCAPTCHA</h3>
                <p className="text-muted-foreground">{t.recaptchaText}</p>
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  {t.recaptchaLink}
                </a>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.retentionTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.retentionText}</p>
          </section>

          {/* GDPR Rights */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.gdprTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.gdprText}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {t.gdprRights.map((right: string, index: number) => (
                <li key={index}>{right}</li>
              ))}
            </ul>
          </section>

          {/* How to Exercise Your Rights */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.exerciseTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.exerciseText}{" "}
              <a 
                href="mailto:kiko.2205@hotmail.com" 
                className="text-gold hover:underline"
              >
                kiko.2205@hotmail.com
              </a>
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.cookiesTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.cookiesText}</p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.changesTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.changesText}</p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="font-display text-2xl mb-4">{t.contactTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.contactText}{" "}
              <a 
                href="mailto:kiko.2205@hotmail.com" 
                className="text-gold hover:underline"
              >
                kiko.2205@hotmail.com
              </a>
            </p>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Francisco Cordeiro Batista. {t.allRightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyContent;
