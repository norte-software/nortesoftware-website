import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

interface ContainerProps<T extends ElementType = "div"> {
  as?: T;
  size?: "narrow" | "default" | "wide";
}

/**
 * Container responsivo con anchos predefinidos.
 *
 * - narrow: 56rem (lectura larga, blog)
 * - default: 72rem (estándar para secciones de marketing)
 * - wide: 80rem (hero y secciones edge-to-edge contenidas)
 */
export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  children,
  ...props
}: ContainerProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as || "div";

  const sizeClasses = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };

  return (
    <Component
      className={cn(
        "w-full mx-auto px-6 lg:px-10",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
