import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ChipVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The theme color of the chip */
  variant?: ChipVariant;
  /** The specific size rendering */
  size?: ChipSize;
  /** The text inside the chip */
  label: React.ReactNode;
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
  /** If provided, renders an X button which triggers this callback */
  onRemove?: () => void;
}

const base =
  "inline-flex items-center justify-center font-medium rounded-full transition-colors whitespace-nowrap";

const variants: Record<ChipVariant, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  success: "bg-green-100 text-green-700",
  danger: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-700",
  neutral: "bg-slate-100 text-slate-700",
};

const sizes: Record<ChipSize, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
  lg: "px-4 py-1.5 text-[15px] gap-2",
};

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      variant = "neutral",
      size = "md",
      label,
      icon,
      onRemove,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{label}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className={cn(
              "ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors",
              "hover:bg-black/10 focus:bg-black/10 focus:outline-none"
            )}
            aria-label="Remove"
          >
            <svg
              className="h-2.5 w-2.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Chip.displayName = "Chip";
export default Chip;
