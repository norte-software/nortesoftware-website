import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  /** Opciones del select */
  options: SelectOption[];
  /** Texto cuando no hay nada seleccionado */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, optional, options, placeholder, className, id, ...props },
    ref,
  ) => {
    const inputId = id ?? props.name;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-cream/85 flex items-center gap-2"
        >
          {label}
          {optional && (
            <span className="text-xs text-cream/40 font-normal">
              (opcional)
            </span>
          )}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              [errorId, hintId].filter(Boolean).join(" ") || undefined
            }
            className={cn(
              "w-full appearance-none px-4 py-3 pr-10 rounded-lg bg-green-panel/40 text-cream",
              "border border-cream/10",
              "transition-colors duration-200 cursor-pointer",
              "focus:outline-none focus:border-gold/60 focus:bg-green-panel/60",
              "focus:ring-2 focus:ring-gold/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error &&
                "border-red-500/60 focus:border-red-500 focus:ring-red-500/20",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" className="bg-green-deep">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-green-deep">
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-cream/50 pointer-events-none"
            aria-hidden
          />
        </div>

        {hint && !error && (
          <p id={hintId} className="text-xs text-cream/45">
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

Select.displayName = "Select";
