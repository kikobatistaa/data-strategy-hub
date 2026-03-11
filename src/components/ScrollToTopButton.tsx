import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const tickingRef = useRef(false);

  const onScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      const shouldShow = window.scrollY > 300;
      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Button
        size="icon"
        variant="outline"
        onClick={scrollToTop}
        className="rounded-full h-12 w-12 shadow-glow border-accent/50 bg-card/70 backdrop-blur-md hover:bg-accent hover:text-primary-foreground"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
