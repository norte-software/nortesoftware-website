import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  /** Mostrar contador de caracteres (requiere maxLength) */
  showCounter?: boolean;
  /** Valor actual (necesario para contador) */
  currentLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      optional,
      showCounter,
      currentLength,
      className,
      id,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? props.name;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
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

          {showCounter && maxLength && currentLength !== undefined && (
            <span
              className={cn(
                "text-xs",
                currentLength > maxLength * 0.9
                  ? "text-amber-400"
                  : "text-ice-white/40",
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          id={inputId}
          maxLength={maxLength}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            [errorId, hintId].filter(Boolean).join(" ") || undefined
          }
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-navy-mid/40 text-ice-white",
            "border border-ice-white/10",
            "placeholder:text-ice-white/30",
            "transition-colors duration-200 resize-y min-h-[120px]",
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

Textarea.displayName = "Textarea";
