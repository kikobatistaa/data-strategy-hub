import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Skip on repeat visits in same session
    if (sessionStorage.getItem("preloader-shown")) {
      setShouldShow(false);
      onComplete();
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShouldShow(false);
      onComplete();
      return;
    }

    sessionStorage.setItem("preloader-shown", "1");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
          // Clean up DOM after animation
          setTimeout(() => setShouldShow(false), 100);
        },
      });

      // Split name into chars
      const nameEl = nameRef.current;
      if (nameEl) {
        const text = nameEl.textContent || "";
        nameEl.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? '<span class="preloader-char">&nbsp;</span>'
              : `<span class="preloader-char">${char}</span>`
          )
          .join("");

        const chars = nameEl.querySelectorAll(".preloader-char");

        tl.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.03,
          ease: "power3.out",
        });
      }

      // Subtitle fade in
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Hold briefly
      tl.to({}, { duration: 0.5 });

      // Clip away overlay
      tl.to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div
        ref={nameRef}
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
      >
        Francisco Batista
      </div>
      <div
        ref={subtitleRef}
        className="mt-4 text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase opacity-0 translate-y-4"
        style={{ opacity: 0, transform: "translateY(16px)" }}
      >
        Data Strategy & Analytics
      </div>
    </div>
  );
};

export default Preloader;
