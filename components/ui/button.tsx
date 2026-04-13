import React, { forwardRef } from "react";
import { cn } from "@/lib/utils"; // or use clsx / classnames

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "dark"
  | "white";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style */
  variant?: ButtonVariant;
  /** Height / padding / font-size preset */
  size?: ButtonSize;
  /** Show spinner and disable pointer events */
  loading?: boolean;
  /** Icon before the label */
  leadingIcon?: React.ReactNode;
  /** Icon after the label */
  trailingIcon?: React.ReactNode;
  /** Render only an icon (square button – omit children) */
  iconOnly?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** Pill / fully-rounded shape */
  pill?: boolean;
  error?: string;
  /** Render as a different element (e.g. "a") */
  as?: React.ElementType;

}

// ─── Styles ───────────────────────────────────────────────────────────────────

const base = [
  "inline-flex items-center justify-center gap-2",
  "font-semibold tracking-wide select-none whitespace-nowrap",
  "border-none outline-none",
  "transition-all duration-150 ease-in-out",
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
  "active:scale-[0.98]",
  "relative overflow-hidden",
].join(" ");

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-[0_1px_2px_rgba(113,82,243,.18),0_2px_8px_rgba(113,82,243,.14)] " +
    "hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(113,82,243,.28)] " +
    "active:bg-primary-active",
  secondary:
    "bg-secondary text-white shadow-[0_1px_2px_rgba(168,209,34,.18),0_2px_8px_rgba(168,209,34,.14)] " +
    "hover:bg-secondary hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(168,209,34,.28)]",
  outline:
    "bg-transparent text-primary border border-primary " +
    "hover:bg-primary/8 hover:-translate-y-px",
  ghost:
    "bg-transparent text-primary " +
    "hover:bg-primary/8",
  danger:
    "bg-red-600 text-white shadow-[0_1px_2px_rgba(220,38,38,.18),0_2px_8px_rgba(220,38,38,.14)] " +
    "hover:bg-red-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(220,38,38,.28)]",
  success:
    "bg-green-600 text-white shadow-[0_1px_2px_rgba(22,163,74,.18),0_2px_8px_rgba(22,163,74,.14)] " +
    "hover:bg-green-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(22,163,74,.28)]",
  dark:
    "bg-slate-900 text-slate-50 shadow-[0_2px_8px_rgba(0,0,0,.22)] " +
    "hover:bg-slate-800 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,.28)]",
  white:
    "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200 " +
    "hover:shadow-md hover:ring-slate-300 hover:-translate-y-px",
};

const sizes: Record<ButtonSize, string> = {
  xs: "h-[30px] px-3 text-xs rounded-lg",
  sm: "h-9 px-4 text-[13px] rounded-lg",
  md: "h-11 px-[22px] text-sm rounded-xl",
  lg: "h-[52px] px-7 text-[15px] rounded-xl",
  xl: "h-[60px] px-9 text-[17px] rounded-[14px]",
};

const iconOnlySizes: Record<ButtonSize, string> = {
  xs: "h-[30px] w-[30px] px-0 rounded-lg",
  sm: "h-9 w-9 px-0 rounded-lg",
  md: "h-11 w-11 px-0 rounded-xl",
  lg: "h-[52px] w-[52px] px-0 rounded-xl",
  xl: "h-[60px] w-[60px] px-0 rounded-[14px]",
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      fullWidth = false,
      pill = false,
      as: Tag = "button",
      className,
      disabled,
      children,
      error,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const iconSize: Record<ButtonSize, string> = {
      xs: "w-3.5 h-3.5",
      sm: "w-4 h-4",
      md: "w-[18px] h-[18px]",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    const spinnerSize = iconSize[size];

    return (
      <>
        <Tag
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={loading}
          className={cn(
            base,
            variants[variant],
            iconOnly ? iconOnlySizes[size] : sizes[size],
            fullWidth && "w-full",
            pill && "!rounded-full",
            loading && "pointer-events-none",
            className
          )}
          {...rest}
        >
          {/* Leading icon OR spinner (spinner replaces leading icon when loading) */}
          {loading ? (
            <Spinner className={spinnerSize} />
          ) : (
            leadingIcon && (
              <span className={cn("flex-shrink-0", iconSize[size])} aria-hidden>
                {leadingIcon}
              </span>
            )
          )}

          {/* Label */}
          {!iconOnly && children && (
            <span className={cn(loading && "opacity-75")}>{children}</span>
          )}

          {/* Trailing icon (hidden when loading) */}
          {!loading && trailingIcon && (
            <span className={cn("flex-shrink-0", iconSize[size])} aria-hidden>
              {trailingIcon}
            </span>
          )}
        </Tag>
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200 mt-2">
            {error}
          </div>
        )}
      </>

    );
  }
);

Button.displayName = "Button";
export default Button;