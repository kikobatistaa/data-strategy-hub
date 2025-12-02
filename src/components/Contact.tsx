import { useRef, useState, useEffect } from "react";
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
import { useForm, ValidationError } from "@formspree/react"; // 1. Importar useForm

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contactSection;
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, "0px", 0.2);
  
  // 2. Substituir a lógica manual pelo hook do Formspree
  // "mgvgynyw" é o ID do seu formulário que estava no fetch
  const [state, handleSubmit] = useForm("mgvgynyw");

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

  // 3. Usar useEffect para reagir ao sucesso ou erro do envio
  useEffect(() => {
    if (state.succeeded) {
      toast.success(t.successMessage);
      setFormData({ name: "", email: "", message: "" }); // Limpar o formulário
    }
    if (state.errors && state.errors.getFormErrors().length > 0) {
      toast.error(t.errorMessage);
    }
  }, [state.succeeded, state.errors, t]);

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
              {/* 4. O onSubmit passa a ser o handleSubmit do hook */}
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
                    disabled={state.submitting}
                  />
                  {/* Opcional: mostrar erro específico deste campo */}
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm" />
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
                    disabled={state.submitting}
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
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
                    disabled={state.submitting}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm" />
                </div>

                <Button
                  type="submit"
                  disabled={state.submitting} // Usar o estado do hook
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6"
                >
                  {state.submitting ? (
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