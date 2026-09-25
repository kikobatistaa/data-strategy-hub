import { forwardRef } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import { scrollToSection } from "@/lib/scrollTo";

type AnchorLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Section id (without the `#`), or "top". */
  to: string;
  /** Runs before scrolling, e.g. to close a menu. */
  onNavigate?: () => void;
  /** Delay the scroll (ms), e.g. while a sheet closes. */
  delay?: number;
};

/** In-page link that scrolls with Lenis when available and falls back to native scrolling. */
const AnchorLink = forwardRef<HTMLAnchorElement, AnchorLinkProps>(
  ({ to, onNavigate, delay = 0, onClick, children, ...rest }, ref) => {
    const { lenis } = useSmoothScroll();
    return (
      <a
        ref={ref}
        href={`#${to}`}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          event.preventDefault();
          onNavigate?.();
          if (delay > 0) {
            window.setTimeout(() => scrollToSection(to, lenis), delay);
          } else {
            scrollToSection(to, lenis);
          }
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
AnchorLink.displayName = "AnchorLink";

export default AnchorLink;
