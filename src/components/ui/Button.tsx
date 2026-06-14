"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Variantes — sistema "Meridiano" (azul = estructura/acción).
 *
 * - primary: relleno azul eléctrico rectangular (radio 8px). CTA principal.
 *   Sin sombra de color; el peso lo da el contraste. Máx. 1 por vista.
 *
 * - secondary: borde hairline, texto ice. CTA secundario (header, etc.).
 *   Al hover el borde sube a azul. Sin relleno.
 *
 * - ghost: texto sin borde, con filete azul que se dibuja al hover.
 *   Para acciones terciarias (WhatsApp en cierre, "ver más", etc.).
 */
const variantClasses: Record<Variant, string> = {
  primary: cn(
    "bg-gold text-green-deep font-semibold",
    "hover:bg-gold-deep hover:text-cream",
    "active:scale-[0.99]",
  ),
  secondary: cn(
    "border border-hairline-strong text-cream bg-transparent",
    "hover:border-gold hover:bg-gold/5",
    "active:scale-[0.99]",
  ),
  ghost: cn(
    "text-cream/80 bg-transparent",
    "hover:text-cream",
    "relative after:content-[''] after:absolute after:left-0 after:bottom-0.5",
    "after:h-px after:w-full after:bg-gold",
    "after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out",
    "hover:after:scale-x-100",
  ),
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-[0.9375rem] gap-2",
  lg: "px-7 py-3.5 text-[0.9375rem] gap-2.5",
};

const baseClasses = cn(
  "inline-flex items-center justify-center",
  "rounded-lg font-sans font-semibold tracking-normal",
  "transition-all duration-300 ease-out",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-gold focus-visible:ring-offset-2",
  "focus-visible:ring-offset-green-deep",
  "disabled:opacity-50 disabled:pointer-events-none",
);

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    // Ghost no usa rounded-full ni padding completo
    variant === "ghost" && "rounded-none px-0 py-0",
    className,
  );

  // Render como link interno (Next Link), externo (a tag), o button
  if ("href" in props && props.href) {
    const { href, external, ...rest } = props;

    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
