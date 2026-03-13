import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const Testimonials = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { onMouseMove } = useMouseGlow();

  const testimonials = [
    {
      quote: "One of his key strengths is his ability to learn quickly\u2014an important skill in the fragmented private jet industry.",
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

      // Cards from alternating sides
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
            {
              opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 px-6 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="card-mouse-glow border border-border/50 bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500"
              onMouseMove={onMouseMove}
            >
              <CardContent className="pt-8 pb-6 px-6">
                <Quote className="h-10 w-10 text-accent/40 mb-4" />

                <blockquote className="text-foreground leading-relaxed mb-6 italic text-base">
                  &ldquo;{testimonial.quote}&rdquo;
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
