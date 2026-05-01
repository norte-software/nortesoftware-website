import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge inteligente de clases Tailwind.
 *
 * Combina `clsx` (manejo de condicionales/arrays) con `tailwind-merge`
 * (resuelve conflictos: si pasas `px-4 px-6`, se queda solo con `px-6`).
 *
 * Uso:
 *   cn("px-4 py-2", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
