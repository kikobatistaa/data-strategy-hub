import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useOnScreen } from "@/hooks/useOnScreen";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, "-100px", 0.1);

  const testimonials = [
    {
      quote: "One of his key strengths is his ability to learn quickly—an important skill in the fragmented private jet industry.",
      author: t.testimonials.netjets.author,
      organization: "NetJets Europe",
      context: t.testimonials.netjets.context,
    },
    {
      quote: "If I must describe him in two words, I will say without doubt: talented and dedicated.",
      author: t.testimonials.nova1.author,
      organization: "NOVA Information Management School",
      context: t.testimonials.nova1.context,
    },
    {
      quote: "Everything seemed to come quite naturally in the case of Francisco.",
      author: t.testimonials.nova2.author,
      organization: "NOVA Information Management School",
      context: t.testimonials.nova2.context,
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`py-24 px-6 relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`border border-border/50 bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="pt-8 pb-6 px-6">
                <Quote className="h-10 w-10 text-accent/40 mb-4" />
                
                <blockquote className="text-foreground leading-relaxed mb-6 italic text-base">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <div className="text-right">
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.organization}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {testimonial.context}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
