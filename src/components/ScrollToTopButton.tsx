import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "./SmoothScroll";
import { scrollToSection } from "@/lib/scrollTo";
import { cn } from "@/lib/utils";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const tickingRef = useRef(false);
  const { lenis } = useSmoothScroll();

  const onScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const shouldShow = window.scrollY > 600;
      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <button
      type="button"
      onClick={() => scrollToSection("top", lenis)}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-md transition-all duration-300 hover:border-foreground",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
    </button>
  );
};

export default ScrollToTopButton;
