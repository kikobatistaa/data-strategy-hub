import { useEffect, useState, RefObject } from 'react';

export function useOnScreen(
  ref: RefObject<HTMLElement>,
  rootMargin: string = '0px',
  threshold: number | number[] = 0.5,
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    const currentElement = ref.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
}
