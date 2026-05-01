import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  /** ID para anchor links (ej: "industrias", "nosotros") */
  anchor?: string;
  /** Espaciado vertical: "default" o "tight" para secciones más densas */
  padding?: "default" | "tight" | "loose";
}

/**
 * Wrapper estándar para secciones del home y páginas internas.
 *
 * Mantiene padding vertical consistente entre secciones (responsive)
 * y maneja el ID para anchor links de la nav.
 *
 * Uso:
 *   <Section anchor="industrias">...</Section>
 *   → renderiza <section id="industrias" className="py-24 md:py-32">
 */
export function Section({
  anchor,
  padding = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const paddingClasses = {
    tight: "py-16 md:py-20",
    default: "py-24 md:py-32",
    loose: "py-32 md:py-44",
  };

  return (
    <section
      id={anchor}
      className={cn("relative", paddingClasses[padding], className)}
      // Offset del scroll cuando se navega a un anchor (compensa altura del header sticky)
      style={anchor ? { scrollMarginTop: "5rem" } : undefined}
      {...props}
    >
      {children}
    </section>
  );
}
