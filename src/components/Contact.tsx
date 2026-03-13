import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, User, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contactSection;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast.error("Please confirm you're not a robot.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mgvgynyw", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          "g-recaptcha-response": recaptchaToken
        })
      });
      if (response.ok) {
        toast.success(t.successMessage);
        setFormData({ name: "", email: "", message: "" });
        setRecaptchaToken(null);
        captchaRef.current?.reset();
      } else {
        toast.error(t.errorMessage);
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        );
      }

      // Form card and fields stagger in
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: formCardRef.current, start: "top 85%" },
          }
        );

        const fields = formCardRef.current.querySelectorAll(".form-field");
        gsap.fromTo(
          fields,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: formCardRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div ref={headingRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>

          <div ref={formCardRef}>
            <Card className="card-mouse-glow border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500">
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-field space-y-2 input-animated">
                    <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-accent" />
                      {t.nameLabel}
                    </Label>
                    <Input
                      id="name" name="name" type="text" required
                      value={formData.name} onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className="bg-secondary/50 border-border/50 focus:border-accent transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-field space-y-2 input-animated">
                    <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent" />
                      {t.emailLabel}
                    </Label>
                    <Input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className="bg-secondary/50 border-border/50 focus:border-accent transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-field space-y-2 input-animated">
                    <Label htmlFor="message" className="text-foreground flex items-center gap-2">
                      <Send className="h-4 w-4 text-accent" />
                      {t.messageLabel}
                    </Label>
                    <Textarea
                      id="message" name="message" required
                      value={formData.message} onChange={handleChange}
                      placeholder={t.messagePlaceholder}
                      className="bg-secondary/50 border-border/50 focus:border-accent min-h-[150px] transition-all duration-300"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-field flex justify-center py-2" role="group" aria-label="Human verification">
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey="6LfQWx8sAAAAAKwPvCMlQG4ueAShMqWYH2XAUOxX"
                      onChange={handleCaptchaChange}
                      theme="dark"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !recaptchaToken}
                    className="btn-shine w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6"
                    data-magnetic
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.sendingButton}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t.sendButton}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
