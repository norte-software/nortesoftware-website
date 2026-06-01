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
 * Variantes alineadas con la estética de marca:
 *
 * - primary: relleno verde menta sobre navy. CTA principal del sitio.
 *   Usar máximo 1 vez por vista para preservar jerarquía.
 *
 * - secondary: borde verde menta, texto verde menta. CTA secundario.
 *   Para "Solicitar propuesta" en fin de secciones, "Ver más", etc.
 *
 * - ghost: texto sin borde ni fondo. Para acciones tertiary.
 *   Underline animado al hover (firma visual de marca).
 */
const variantClasses: Record<Variant, string> = {
  primary: cn(
    "bg-mint-accent text-navy-deep font-semibold",
    "hover:bg-mint-accent/90 hover:shadow-[0_0_32px_-8px_rgba(200,133,42,0.6)]",
    "active:scale-[0.98]",
  ),
  secondary: cn(
    "border-2 border-mint-accent/80 text-mint-accent bg-transparent",
    "hover:bg-mint-accent hover:text-navy-deep",
    "hover:shadow-[0_0_32px_-8px_rgba(200,133,42,0.4)]",
    "active:scale-[0.98]",
  ),
  ghost: cn(
    "text-ice-white/80 bg-transparent",
    "hover:text-mint-accent",
    "relative after:content-[''] after:absolute after:left-0 after:bottom-1",
    "after:h-px after:w-full after:bg-mint-accent",
    "after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
    "hover:after:scale-x-100",
  ),
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

const baseClasses = cn(
  "inline-flex items-center justify-center",
  "rounded-full font-medium",
  "transition-all duration-300 ease-out",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-mint-accent focus-visible:ring-offset-2",
  "focus-visible:ring-offset-navy-deep",
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
