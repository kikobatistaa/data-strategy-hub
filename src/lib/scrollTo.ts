import type Lenis from "lenis";

/** Height of the fixed nav, in px. Keep in sync with `h-16` in Nav.tsx. */
export const NAV_OFFSET = -64;

export function scrollToSection(id: string, lenis: Lenis | null, immediate = false) {
  if (id === "top") {
    if (lenis) lenis.scrollTo(0, { immediate });
    else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET, immediate });
  } else {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  }
}
