import { cn } from "@/lib/utils";

interface AccentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Palabra-acento de los titulares — sistema "Latón del Norte".
 *
 * Oro/latón SÓLIDO (la señal que "orienta") + filete de oro de 2px debajo
 * (detalle de imprenta). Una sola por titular: el oro es señal escasa.
 */
export function Accent({ children, className }: AccentProps) {
  return (
    <span
      className={cn(
        "relative inline-block text-gold",
        "after:content-[''] after:absolute after:-bottom-1 after:left-0",
        "after:h-0.5 after:w-full after:bg-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}
