"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

interface ObfuscatedContactProps {
  /**
   * Valor real (email o teléfono).
   * Para email: "info@nortesoftware.dev"
   * Para teléfono: usa formato display "+52 967 145 6444"
   */
  value: string;
  /** Tipo: "email" usa mailto:, "phone" usa tel: */
  type: "email" | "phone";
  /**
   * Para teléfono, formato E.164 sin caracteres para el href.
   * Ej: "+529671456444"
   */
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Hook útil para detectar si estamos hidratados (client-side).
 *
 * useSyncExternalStore es el API oficial de React 18+ para sincronizar
 * con stores externos. Para detección de hidratación lo usamos así:
 *   - getSnapshot (cliente) → siempre devuelve true
 *   - getServerSnapshot (SSR) → devuelve false
 *
 * El resultado: el server renderiza con `false`, y al hidratar el
 * cliente hace un re-render con `true`. Sin setState, sin useEffect,
 * sin warning de ESLint. Es el patrón canónico.
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {}, // subscribe (no-op, no necesitamos suscripción)
    () => true, // client snapshot
    () => false, // server snapshot
  );
}

function reverse(str: string): string {
  return str.split("").reverse().join("");
}

/**
 * Renderiza un email o teléfono ofuscado contra scrapers básicos.
 *
 * Estrategia:
 * - SSR renderiza el valor invertido (RTL) y href="#"
 * - Al hidratar, useSyncExternalStore flipea isHydrated a true
 * - Cliente vuelve a renderizar con valor real
 *
 * Lectores de pantalla: aria-label tiene el valor real desde el primer
 * render. La accesibilidad nunca se sacrifica por anti-scraping.
 */
export function ObfuscatedContact({
  value,
  type,
  href,
  className,
  children,
}: ObfuscatedContactProps) {
  const isHydrated = useIsHydrated();

  const displayed = isHydrated ? value : reverse(value);
  const linkHref = isHydrated
    ? type === "email"
      ? `mailto:${value}`
      : `tel:${href ?? value}`
    : "#";

  return (
    <a
      href={linkHref}
      className={cn(className)}
      aria-label={
        type === "email" ? `Enviar correo a ${value}` : `Llamar al ${value}`
      }
      onClick={(e) => {
        if (!isHydrated) e.preventDefault();
      }}
    >
      {children ?? <span dir={isHydrated ? "ltr" : "rtl"}>{displayed}</span>}
    </a>
  );
}
