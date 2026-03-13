import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Brain, Music } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { Separator } from "@/components/ui/separator";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].about;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoLoadedRef = useRef(false);
  const { onMouseMove } = useMouseGlow();

  // Track if video section is visible for lazy loading
  useEffect(() => {
    if (!videoSectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoLoadedRef.current = true;
          // Force re-render by triggering a state change through DOM
          const videoContainer = videoSectionRef.current?.querySelector(".video-placeholder");
          if (videoContainer) {
            videoContainer.innerHTML = `<video class="w-full h-full object-cover" controls preload="metadata" playsinline><source src="/saxophone.mp4" type="video/mp4" /></video>`;
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(videoSectionRef.current);
    return () => observer.disconnect();
  }, []);

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

      // Content paragraphs stagger
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p");
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
          }
        );
      }

      // Bento grid cells stagger
      if (bentoRef.current) {
        const cells = bentoRef.current.children;
        gsap.fromTo(
          cells,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: bentoRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderText = (text: string) => {
    const parts = text.split(/<strong>|<\/strong>/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-foreground">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          </div>

          <Card className="card-mouse-glow border border-white/10 shadow-card hover:shadow-hover bg-card/50 backdrop-blur-md hover:border-accent/50 transition-all duration-500" onMouseMove={onMouseMove}>
            <CardContent className="pt-8 space-y-6">
              <div ref={contentRef} className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p className="text-lg">{renderText(t.p1)}</p>
                <p className="text-lg">{renderText(t.p2)}</p>
                <p className="text-lg">{renderText(t.p3)}</p>
                <p className="text-lg">{renderText(t.p4)}</p>
                <p className="text-lg">{renderText(t.p5)}</p>
              </div>

              {/* Bento Grid */}
              <div ref={bentoRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.expertise}</h3>
                    <p className="text-sm text-muted-foreground">{t.expertiseDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.languagesTitle}</h3>
                    <p className="text-sm text-muted-foreground">{t.languagesDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/30 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 col-span-2 md:col-span-1">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.experience}</h3>
                    <p className="text-sm text-muted-foreground">{t.experienceDesc}</p>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div ref={videoSectionRef} className="pt-8">
                <Separator className="bg-white/10 mb-8" />

                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent/10 shadow-glow">
                    <Music className="h-6 w-6 text-accent" />
                  </div>
                  {t.otherInterests}
                </h3>

                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">{t.hobby}</p>

                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 shadow-inner aspect-video max-w-2xl mx-auto">
                    <div className="video-placeholder w-full h-full flex items-center justify-center bg-black/40">
                      <Music className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
