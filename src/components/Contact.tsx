import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";
import { ScrollTrigger } from "@/lib/gsap";
import { LINKS } from "@/lib/links";
import SectionHeader from "./SectionHeader";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgvgynyw";
const RECAPTCHA_SITEKEY = "6LfQWx8sAAAAAKwPvCMlQG4ueAShMqWYH2XAUOxX";

const fieldClass =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-foreground focus:outline-none disabled:opacity-50";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const ref = useReveal<HTMLElement>();
  const captchaRef = useRef<ReCAPTCHA>(null);

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // This section is lazy-loaded: its real height only exists now.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast.error(t.captchaRequired);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          "g-recaptcha-response": recaptchaToken,
        }),
      });
      if (response.ok) {
        toast.success(t.success);
        setFormData({ name: "", email: "", message: "" });
        setRecaptchaToken(null);
        captchaRef.current?.reset();
      } else {
        toast.error(t.error);
      }
    } catch {
      toast.error(t.connectionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container">
        <SectionHeader index="06" eyebrow={t.eyebrow} title={t.title} className="mb-10 md:mb-14" />

        <div className="grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <p className="max-w-[40ch] text-lg leading-relaxed text-muted-foreground">{t.lead}</p>
            <div className="mt-10 space-y-3">
              <p className="eyebrow">{t.directLabel}</p>
              <a href={`mailto:${LINKS.email}`} className="link-quiet block font-mono text-sm text-foreground">
                {LINKS.email}
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet block font-mono text-sm text-foreground"
              >
                linkedin.com/in/kikobatistaa
              </a>
              <p className="eyebrow pt-4">{t.location}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} data-reveal className="space-y-8 lg:col-span-7" noValidate={false}>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="eyebrow block">
                  {t.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className={fieldClass}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="eyebrow block">
                  {t.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={fieldClass}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="eyebrow block">
                {t.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t.messagePlaceholder}
                className={`${fieldClass} min-h-[140px] resize-y`}
                disabled={isSubmitting}
              />
            </div>

            <div role="group" aria-label="Human verification">
              <ReCAPTCHA ref={captchaRef} sitekey={RECAPTCHA_SITEKEY} onChange={setRecaptchaToken} theme="dark" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !recaptchaToken}
              className="inline-flex h-12 items-center gap-2 bg-primary px-8 font-mono text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {isSubmitting ? t.sending : t.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
