import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { Isotipo } from "./Isotipo";

interface LogoProps {
  /** "full" muestra isotipo + wordmark. "isotipo" solo el escudo-brújula. */
  variant?: "full" | "isotipo";
  /** Si está dentro de un link, desactiva wrapping interno. */
  asLink?: boolean;
  /** Clase para ajustar tamaño/espaciado en cada uso. */
  className?: string;
}

export function Logo({
  variant = "full",
  asLink = true,
  className,
}: LogoProps) {
  const content =
    variant === "full" ? (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <Isotipo className="h-9 w-auto shrink-0" />
        <span className="font-display font-bold text-cream text-lg leading-none tracking-tight">
          NORTE <span className="text-gold">SOFTWARE</span>
        </span>
      </span>
    ) : (
      <Isotipo
        title={SITE.name}
        className={cn("h-10 w-auto", className)}
      />
    );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — inicio`}
      className="inline-flex items-center transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-80"
    >
      {content}
    </Link>
  );
}
