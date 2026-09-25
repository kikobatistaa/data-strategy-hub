import type { ReactNode } from "react";

/** Renders a string with `<strong>…</strong>` markers as React nodes. */
export const renderText = (text: string): ReactNode[] => {
  const parts = text.split(/<strong>|<\/strong>/);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-medium text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  );
};
