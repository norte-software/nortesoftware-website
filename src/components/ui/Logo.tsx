import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

interface LogoProps {
  /** "full" muestra logo + texto. "isotipo" solo el escudo-brújula. */
  variant?: "full" | "isotipo";
  /** Si está dentro de un link, desactiva wrapping interno. */
  asLink?: boolean;
  /** Clase para ajustar tamaño en cada uso. */
  className?: string;
}

const ISOTIPO_SRC = "/images/isotipo-claro.png";

export function Logo({
  variant = "full",
  asLink = true,
  className,
}: LogoProps) {
  const content =
    variant === "full" ? (
      <span className={cn("inline-flex items-center gap-3", className)}>
        <Image
          src={ISOTIPO_SRC}
          alt=""
          width={36}
          height={36}
          priority
          className="size-9 object-contain"
          aria-hidden
        />
        <span className="font-display font-bold text-ice-white text-lg leading-none">
          NORTE{" "}
          <span className="text-electric-blue">SOFTWARE</span>
        </span>
      </span>
    ) : (
      <Image
        src={ISOTIPO_SRC}
        alt={`${SITE.name}`}
        width={48}
        height={48}
        priority
        className={cn("size-10 object-contain", className)}
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
