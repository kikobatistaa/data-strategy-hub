import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ringRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovering(isInteractive);
    };

    // Smooth ring animation with RAF
    const animateRing = () => {
      const dx = mousePosition.x - ringRef.current.x;
      const dy = mousePosition.y - ringRef.current.y;
      
      ringRef.current.x += dx * 0.15;
      ringRef.current.y += dy * 0.15;
      
      rafRef.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    animateRing();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Cursor Dot - follows exactly */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px) scale(${isHovering ? 0.5 : 1})`,
        }}
      />
      
      {/* Cursor Ring - follows with delay */}
      <div
        className="fixed top-0 left-0 border-2 border-foreground/40 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300"
        style={{
          width: isHovering ? "60px" : "40px",
          height: isHovering ? "60px" : "40px",
          transform: `translate(${ringRef.current.x - (isHovering ? 30 : 20)}px, ${ringRef.current.y - (isHovering ? 30 : 20)}px)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
