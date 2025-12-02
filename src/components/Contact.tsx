import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useOnScreen } from "@/hooks/useOnScreen";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contactSection;
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, "0px", 0.2);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mgvgynyw", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        toast({
          title: t.successTitle,
          description: t.successDesc,
          variant: "default",
          className: "bg-green-600 border-green-700 text-white",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          variant: "destructive",
          title: t.errorTitle,
          description: t.errorDesc,
        });
      }
    } catch (error) {
       toast({
          variant: "destructive",
          title: t.errorTitle,
          description: t.errorDesc,
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-32 bg-background relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <Card className="border border-white/10 shadow-card bg-card/50 backdrop-blur-md overflow-hidden">
            <CardHeader className="bg-secondary/30 border-b border-white/5 pb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-accent/10 border border-accent/20 shadow-glow">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-accent" />
                      {t.name}
                    </Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      className="bg-secondary/50 border-white/10 focus:border-accent/50 transition-colors h-12"
                      placeholder={t.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent" />
                      {t.email}
                    </Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      className="bg-secondary/50 border-white/10 focus:border-accent/50 transition-colors h-12"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-accent" />
                    {t.message}
                  </Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required 
                    className="min-h-[150px] bg-secondary/50 border-white/10 focus:border-accent/50 transition-colors resize-y"
                    placeholder={t.message}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-medium bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.sending}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      {t.send}
                    </span>
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