import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on devices with fine pointer (no touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Magnetic effect on data-magnetic elements
      const target = e.target as HTMLElement;
      const magnetic = target.closest("[data-magnetic]") as HTMLElement | null;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        gsap.to(magnetic, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetic = target.closest("[data-magnetic]") as HTMLElement | null;
      if (magnetic) {
        gsap.to(magnetic, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeaveDoc = () => setIsVisible(false);

    // Lerp loop for circle
    const lerp = () => {
      circlePos.current.x += (posRef.current.x - circlePos.current.x) * 0.15;
      circlePos.current.y += (posRef.current.y - circlePos.current.y) * 0.15;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circlePos.current.x - 20}px, ${circlePos.current.y - 20}px)`;
      }
      requestAnimationFrame(lerp);
    };
    const rafId = requestAnimationFrame(lerp);

    // Hover detection for interactive elements
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]")) {
        circleRef.current?.classList.add("scale-150", "opacity-50");
        dotRef.current?.classList.add("scale-0");
      }
    };
    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]")) {
        circleRef.current?.classList.remove("scale-150", "opacity-50");
        dotRef.current?.classList.remove("scale-0");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseLeave); // for magnetic reset
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeaveDoc);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 z-[10000] ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference transition-transform duration-100"
      />
      {/* Larger circle */}
      <div
        ref={circleRef}
        className="absolute top-0 left-0 w-10 h-10 rounded-full border border-white/50 mix-blend-difference transition-[transform,opacity] duration-300"
      />
    </div>
  );
};

export default CustomCursor;
