import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, User, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useOnScreen } from "@/hooks/useOnScreen";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contactSection;
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, "0px", 0.05);
  const captchaRef = useRef<ReCAPTCHA>(null); // Referência para resetar o captcha visualmente

  // Estados locais
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCaptchaChange = (token: string | null) => {
    console.log("Captcha token gerado:", token);
    setRecaptchaToken(token);
  };

  // Função de envio manual
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error("Por favor, confirma que não és um robô.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mgvgynyw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          "g-recaptcha-response": recaptchaToken // Envia o token explicitamente
        })
      });

      if (response.ok) {
        toast.success(t.successMessage);
        setFormData({ name: "", email: "", message: "" });
        setRecaptchaToken(null);
        captchaRef.current?.reset(); // Limpa a checkbox do captcha
      } else {
        const errorData = await response.json();
        console.error("Erro Formspree:", errorData); // Vê a consola (F12) se der erro!
        toast.error(t.errorMessage);
      }
    } catch (error) {
      console.error("Erro de Rede:", error);
      toast.error("Erro de conexão. Tenta novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-32 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
          
          <Card className="border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-accent" />
                    {t.nameLabel}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className="bg-secondary/50 border-border/50 focus:border-accent"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent" />
                    {t.emailLabel}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="bg-secondary/50 border-border/50 focus:border-accent"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground flex items-center gap-2">
                    <Send className="h-4 w-4 text-accent" />
                    {t.messageLabel}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    className="bg-secondary/50 border-border/50 focus:border-accent min-h-[150px]"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Componente Google reCAPTCHA */}
                <div className="flex justify-center py-2" role="group" aria-label="Human verification">
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
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6"
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
    </section>
  );
};

export default Contact;