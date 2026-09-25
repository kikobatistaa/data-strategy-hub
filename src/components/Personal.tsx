import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useReveal } from "@/hooks/useReveal";
import { ScrollTrigger } from "@/lib/gsap";
import { renderText } from "@/lib/renderText";
import SectionHeader from "./SectionHeader";

const Personal = () => {
  const { language } = useLanguage();
  const t = translations[language].personal;
  const ref = useReveal<HTMLElement>();
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  // This section is lazy-loaded: its real height only exists now.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // Only attach the (large) video once the box is near the viewport.
  useEffect(() => {
    const el = videoBoxRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container">
        <SectionHeader index="05" eyebrow={t.eyebrow} title={t.title} />

        <div className="grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-7">
            <div ref={videoBoxRef} className="relative aspect-video overflow-hidden border border-border bg-black">
              {showVideo ? (
                <video className="h-full w-full object-cover" controls preload="metadata" playsInline>
                  <source src="/saxophone.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-muted-foreground">
                  <Play className="h-8 w-8" aria-hidden />
                  <span className="eyebrow">{t.videoLabel}</span>
                </div>
              )}
            </div>
            <p className="eyebrow mt-5">{t.videoHint}</p>
          </div>

          <div className="lg:col-span-5">
            <p data-reveal className="text-lg leading-relaxed text-muted-foreground">
              {renderText(t.intro)}
            </p>
            <dl className="mt-10 border-t border-border">
              {t.items.map((item) => (
                <div key={item.label} data-reveal className="grid gap-1 border-b border-border py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <dt className="font-mono text-sm text-gold">{item.label}</dt>
                  <dd className="text-foreground/85">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personal;
