import { useCallback, useRef, useEffect } from "react";

const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export const useTiltEffect = (maxTilt = 5) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = isTouchDevice();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`;
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
};
