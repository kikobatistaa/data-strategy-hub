import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import LanguageSelector from "@/components/LanguageSelector";
import { LanguageProvider } from "@/contexts/LanguageContext";

const PrivacyContent = () => {
  const { language } = useLanguage();
  const t = translations[language].privacy;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t.backToHome}</span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-24 pb-16 max-w-4xl">
        <article className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mb-8">{t.lastUpdated}</p>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.introTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.introText}</p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.collectTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.collectText}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {t.collectItems.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.useTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.useText}</p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.thirdPartyTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.thirdPartyText}</p>
            
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Formspree</h3>
                <p className="text-muted-foreground">{t.formspreeText}</p>
                <a 
                  href="https://formspree.io/legal/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
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
                  className="text-accent hover:underline"
                >
                  {t.recaptchaLink}
                </a>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.retentionTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.retentionText}</p>
          </section>

          {/* GDPR Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.gdprTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.gdprText}</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              {t.gdprRights.map((right: string, index: number) => (
                <li key={index}>{right}</li>
              ))}
            </ul>
          </section>

          {/* How to Exercise Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.exerciseTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.exerciseText}{" "}
              <a 
                href="mailto:kiko.2205@hotmail.com" 
                className="text-accent hover:underline"
              >
                kiko.2205@hotmail.com
              </a>
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.cookiesTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.cookiesText}</p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.changesTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.changesText}</p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.contactTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.contactText}{" "}
              <a 
                href="mailto:kiko.2205@hotmail.com" 
                className="text-accent hover:underline"
              >
                kiko.2205@hotmail.com
              </a>
            </p>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Francisco Cordeiro Batista. {t.allRightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
};

const Privacy = () => {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
};

export default Privacy;
