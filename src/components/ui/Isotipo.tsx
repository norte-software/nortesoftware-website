import { cn } from "@/lib/utils";

interface IsotipoProps {
  className?: string;
  /** Texto accesible. Por defecto decorativo (aria-hidden). */
  title?: string;
}

/**
 * Isotipo Norte Software — escudo + aguja de brújula, vectorial.
 *
 * Sistema "Latón del Norte":
 *   - Escudo: trazo crema sobre verde.
 *   - Aguja norte: oro/latón #C69B3C (dirección/acción).
 *   - Aguja sur: slate #8FA39B.
 *   - Hub: anillo de latón (el "norte").
 *   - Marcas cardinales sutiles.
 *
 * SVG real (no PNG embebido): escala sin pérdida a cualquier tamaño.
 */
export function Isotipo({ className, title }: IsotipoProps) {
  return (
    <svg
      viewBox="0 0 44 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}

      {/* Escudo */}
      <path
        d="M22 44.5C14 40.5 6 35.5 6 24.5V9.5A4.5 4.5 0 0 1 10.5 5H33.5A4.5 4.5 0 0 1 38 9.5V24.5C38 35.5 30 40.5 22 44.5Z"
        stroke="#F4EADE"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />

      {/* Aguja norte (oro/latón) */}
      <path d="M22 11 L24.2 24 L19.8 24 Z" fill="#C69B3C" />
      {/* Aguja sur (slate) */}
      <path d="M22 39 L24.2 26 L19.8 26 Z" fill="#8FA39B" />

      {/* Hub de latón (anillo) */}
      <circle cx="22" cy="25" r="4" fill="#C69B3C" />
      <circle cx="22" cy="25" r="1.7" fill="#0C2A22" />

      {/* Marcas cardinales */}
      <circle cx="22" cy="8" r="1" fill="#C69B3C" />
      <circle cx="22" cy="41.5" r="1" fill="#8FA39B" opacity="0.7" />
      <circle cx="9.5" cy="24.5" r="1" fill="#8FA39B" opacity="0.55" />
      <circle cx="34.5" cy="24.5" r="1" fill="#8FA39B" opacity="0.55" />
    </svg>
  );
}
