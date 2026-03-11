import { useEffect, useState, RefObject } from 'react';

export function useOnScreen(
  ref: RefObject<HTMLElement>,
  rootMargin: string = '0px',
  threshold: number | number[] = 0.5,
): boolean {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          // Stop observing once visible — no need to re-hide
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
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

  return hasBeenVisible;
}
