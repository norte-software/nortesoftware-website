import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label visible arriba del input */
  label: string;
  /** Mensaje de error (usualmente del react-hook-form) */
  error?: string;
  /** Texto de ayuda debajo del input */
  hint?: string;
  /** Si es opcional, muestra "(opcional)" en el label */
  optional?: boolean;
}

/**
 * Input estilizado para formularios.
 *
 * Estados:
 *   - default: borde sutil
 *   - focus: borde mint accent + ring
 *   - error: borde rojo + mensaje
 *   - disabled: opacity reducida
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, optional, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-ice-white/85 flex items-center gap-2"
        >
          {label}
          {optional && (
            <span className="text-xs text-ice-white/40 font-normal">
              (opcional)
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            [errorId, hintId].filter(Boolean).join(" ") || undefined
          }
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-navy-mid/40 text-ice-white",
            "border border-ice-white/10",
            "placeholder:text-ice-white/30",
            "transition-colors duration-200",
            "focus:outline-none focus:border-mint-accent/60 focus:bg-navy-mid/60",
            "focus:ring-2 focus:ring-mint-accent/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error &&
              "border-red-500/60 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-xs text-ice-white/45">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
