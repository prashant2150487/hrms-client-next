import { useState, useRef, forwardRef, ReactNode, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type InputSize = "sm" | "md" | "lg" | "xl";
type InputShape = "default" | "sharp" | "pill" | "flat";
type InputTheme = "purple" | "teal" | "blue" | "coral" | "rose";
type InputState = "default" | "error" | "success" | "warning";
type InputElement = "input" | "textarea" | "select";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  message?: string;
  state?: InputState;
  size?: InputSize;
  shape?: InputShape;
  theme?: InputTheme;
  floatLabel?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  prefix?: string;
  suffix?: string;
  inputClass?: string;
  as?: InputElement;
  children?: ReactNode;
}

// ─── ICONS ──────────────────────────────────────────────────────────────────
 
const IconSearch = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
 
const IconLock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
 
const IconEye = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
 
const IconEyeOff = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path d="M2 2l12 12M6.5 6.6A2 2 0 0010 9.5M4.2 4.3C2.5 5.4 1 8 1 8s2.5 5 7 5c1.4 0 2.7-.4 3.8-1M7 3.1C7.3 3 7.7 3 8 3c4.5 0 7 5 7 5s-.8 1.7-2.2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
 
const IconCircleCheck = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
 
const IconCircleAlert = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
 
// ─── THEME CONFIG ────────────────────────────────────────────────────────────
// Primary color: #7152F3 (purple), Text color: #16151C (dark 500)

const THEMES = {
  purple: {
    focus: "focus:border-[#7152F3] focus:ring-[#7152F3]/15",
    label: "peer-focus:text-[#7152F3]",
    labelActive: "text-[#7152F3]",
  },
  teal: {
    focus: "focus:border-teal-500 focus:ring-teal-500/15",
    label: "peer-focus:text-teal-600",
    labelActive: "text-teal-600",
  },
  blue: {
    focus: "focus:border-blue-500 focus:ring-blue-500/15",
    label: "peer-focus:text-blue-600",
    labelActive: "text-blue-600",
  },
  coral: {
    focus: "focus:border-orange-500 focus:ring-orange-500/15",
    label: "peer-focus:text-orange-600",
    labelActive: "text-orange-600",
  },
  rose: {
    focus: "focus:border-rose-500 focus:ring-rose-500/15",
    label: "peer-focus:text-rose-600",
    labelActive: "text-rose-600",
  },
};
 
const SIZES = {
  sm:  { input: "h-8  text-xs  px-3",   label: "text-xs",  icon: "w-3.5 h-3.5", iconPad: "pl-8",  iconRight: "pr-8"  },
  md:  { input: "h-10 text-sm  px-3.5", label: "text-xs",  icon: "w-4 h-4",     iconPad: "pl-9",  iconRight: "pr-9"  },
  lg:  { input: "h-12 text-base px-4",  label: "text-sm",  icon: "w-4 h-4",     iconPad: "pl-10", iconRight: "pr-10" },
  xl:  { input: "h-14 text-base px-4",  label: "text-sm",  icon: "w-5 h-5",     iconPad: "pl-11", iconRight: "pr-11" },
};
 
const SHAPES = {
  default: "rounded-lg",
  sharp:   "rounded",
  pill:    "rounded-full",
  flat:    "rounded-none border-x-0 border-t-0 px-0",
};
 
const STATE_STYLES = {
  default: {
    input:   "border-[#7152F3] bg-white text-[#16151C] placeholder:text-gray-400",
    label:   "text-[#16151C]",
    message: "",
    icon:    "",
  },
  error: {
    input:   "border-red-400 bg-red-50/30 text-gray-900 focus:border-red-500 focus:ring-red-500/15",
    label:   "text-red-500",
    message: "text-red-500",
    icon:    <IconCircleAlert className="w-3.5 h-3.5 shrink-0" />,
  },
  success: {
    input:   "border-emerald-400 bg-emerald-50/30 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500/15",
    label:   "text-emerald-600",
    message: "text-emerald-600",
    icon:    <IconCircleCheck className="w-3.5 h-3.5 shrink-0" />,
  },
  warning: {
    input:   "border-amber-400 bg-amber-50/30 text-gray-900 focus:border-amber-500 focus:ring-amber-500/15",
    label:   "text-amber-600",
    message: "text-amber-600",
    icon:    <IconCircleAlert className="w-3.5 h-3.5 shrink-0" />,
  },
};
 
// ─── MAIN INPUT COMPONENT ────────────────────────────────────────────────────
 
/**
 * Input — production-ready, fully customisable input field.
 *
 * Props:
 *  label        string   — field label
 *  hint         string   — helper text below the input
 *  message      string   — feedback text (error / success / warning)
 *  state        "default" | "error" | "success" | "warning"
 *  size         "sm" | "md" | "lg" | "xl"
 *  shape        "default" | "sharp" | "pill" | "flat"
 *  theme        "purple" | "teal" | "blue" | "coral" | "rose"
 *  floatLabel   boolean  — Material-style floating label
 *  required     boolean
 *  disabled     boolean
 *  readOnly     boolean
 *  iconLeft     ReactNode
 *  iconRight    ReactNode
 *  prefix       string   — text prefix (e.g. "https://")
 *  suffix       string   — text suffix (e.g. ".com")
 *  maxLength    number   — enables character counter
 *  as           "input" | "textarea" | "select"
 *  children     ReactNode (for select options)
 *  className    string   — extra classes on wrapper
 *  inputClass   string   — extra classes on input element
 *  ...rest      passed directly to the input/textarea/select
 */
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputProps>(function Input(
  {
    label,
    hint,
    message,
    state = "default",
    size = "md",
    shape = "default",
    theme = "purple",
    floatLabel = false,
    required = false,
    disabled = false,
    readOnly = false,
    iconLeft,
    iconRight,
    prefix,
    suffix,
    maxLength,
    as: Tag = "input",
    children,
    className = "",
    inputClass = "",
    id,
    value,
    defaultValue,
    onChange,
    ...rest
  },
  ref
) {
  const [charCount, setCharCount] = useState(
    (value ?? defaultValue ?? "").toString().length
  );
  const [controlled] = useState(value !== undefined);
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 8)}`;
 
  const sz = SIZES[size as InputSize] ?? SIZES.md;
  const th = THEMES[theme as InputTheme] ?? THEMES.purple;
  const sh = SHAPES[shape as InputShape] ?? SHAPES.default;
  const st = STATE_STYLES[state as InputState] ?? STATE_STYLES.default;
 
  // ── base input classes
  const baseInput = [
    "w-full border outline-none transition-all duration-150",
    "focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed",
    "read-only:bg-gray-50 read-only:cursor-default",
    sz.input, sh,
    state === "default" ? [st.input, th.focus].join(" ") : st.input,
    iconLeft  ? sz.iconPad  : "",
    iconRight ? sz.iconRight : "",
    floatLabel ? "placeholder-transparent" : "",
    Tag === "textarea" ? "resize-y min-h-[80px] py-2.5" : "",
    Tag === "select"   ? "appearance-none cursor-pointer pr-9 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMTIgOCI+PHBhdGggZD0iTTEgMWw1IDUgNS01IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-[right_12px_center]" : "",
    inputClass,
  ].filter(Boolean).join(" ");
 
  // ── floating label classes
  const floatLabelCls = [
    "absolute left-3.5 transition-all duration-150 pointer-events-none bg-white px-1 select-none",
    "top-1/2 -translate-y-1/2 text-gray-400",
    "peer-focus:top-0 peer-focus:text-xs peer-focus:-translate-y-1/2",
    "peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1/2",
    state === "default" ? th.label : (st.label ?? ""),
    "peer-not-placeholder-shown:" + (state === "default" ? th.labelActive : (st.label ?? "")),
  ].join(" ");
 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (maxLength) setCharCount((e.target as HTMLInputElement).value.length);
    onChange?.(e as any);
  };
 
  // ── render
  const inputEl = (
    <Tag
      ref={ref as any}
      id={inputId}
      className={["peer", baseInput].join(" ")}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      maxLength={maxLength}
      value={controlled ? value : undefined}
      defaultValue={!controlled ? defaultValue : undefined}
      onChange={handleChange as any}
      placeholder={floatLabel ? " " : (rest as any).placeholder}
      {...(rest as any)}
    >
      {children}
    </Tag>
  ) as any;
 
  return (
    <div className={["flex flex-col gap-1", disabled ? "opacity-60" : "", className].join(" ")}>
      {/* Static label */}
      {label && !floatLabel && (
        <label
          htmlFor={inputId}
          className={[
            "font-normal leading-none",
            sz.label,
            state !== "default" ? (st.label ?? "text-[#7152F3]") : "text-[#7152F3]",
          ].join(" ")}
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
 
      {/* Input + prefix/suffix + icons */}
      <div className="relative flex items-stretch">
        {/* Prefix */}
        {prefix && (
          <span className={[
            "flex items-center px-3 border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm shrink-0",
            shape === "pill"  ? "rounded-l-full" :
            shape === "sharp" ? "rounded-l"      : "rounded-l-lg",
          ].join(" ")}>
            {prefix}
          </span>
        )}
 
        {/* Wrapper for floating label */}
        <div className="relative flex-1">
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              {iconLeft}
            </span>
          )}
 
          {inputEl}
 
          {/* Floating label overlay */}
          {label && floatLabel && (
            <label htmlFor={inputId} className={floatLabelCls}>
              {label}
              {required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
          )}
 
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              {iconRight}
            </span>
          )}
        </div>
 
        {/* Suffix */}
        {suffix && (
          <span className={[
            "flex items-center px-3 border border-l-0 border-gray-200 bg-gray-50 text-gray-500 text-sm shrink-0",
            shape === "pill"  ? "rounded-r-full" :
            shape === "sharp" ? "rounded-r"      : "rounded-r-lg",
          ].join(" ")}>
            {suffix}
          </span>
        )}
      </div>
 
      {/* Footer row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          {/* Message (error / success / warning) */}
          {message && (
            <p className={["flex items-center gap-1 text-xs", st.message].join(" ")}>
              {st.icon}
              {message}
            </p>
          )}
          {/* Hint */}
          {hint && !message && (
            <p className="text-xs text-gray-400">{hint}</p>
          )}
        </div>
 
        {/* Character counter */}
        {maxLength && (
          <p className={[
            "text-xs tabular-nums shrink-0",
            charCount > maxLength * 0.9 ? "text-red-500" : "text-gray-400",
          ].join(" ")}>
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});
 
// ─── PASSWORD INPUT ──────────────────────────────────────────────────────────
 
export function PasswordInput({ theme = "purple", size = "md", ...props }: Omit<InputProps, 'type'>) {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      theme={theme as InputTheme}
      size={size as InputSize}
      iconLeft={<IconLock />}
      iconRight={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="pointer-events-auto text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <IconEyeOff /> : <IconEye />}
        </button>
      }
    />
  );
}
 
// ─── SEARCH INPUT ────────────────────────────────────────────────────────────
 
export function SearchInput({ kbd, theme = "purple", size = "md", ...props }: Omit<InputProps, 'type'> & { kbd?: string }) {
  return (
    <Input
      {...props}
      type="search"
      theme={theme as InputTheme}
      size={size as InputSize}
      shape="pill"
      iconLeft={<IconSearch />}
      iconRight={
        kbd ? (
          <span className="pointer-events-none bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[10px] text-gray-400 font-mono">
            {kbd}
          </span>
        ) : null
      }
    />
  );
}
 
// ─── OTP INPUT ───────────────────────────────────────────────────────────────
 
export function OtpInput({ length = 6, theme = "purple", onComplete, label }: { length?: number; theme?: InputTheme; onComplete?: (code: string) => void; label?: string }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const refs = Array.from({ length }, () => useRef<HTMLInputElement>(null));
  const th = THEMES[theme] ?? THEMES.purple;

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handleChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[i] = v;
    setValues(next);
    if (v && i < length - 1) refs[i + 1].current?.focus();
    if (next.every(Boolean)) onComplete?.(next.join(""));
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
    const next = [...values];
    pasted.forEach((c: string, i: number) => { next[i] = c; });
    setValues(next);
    refs[Math.min(pasted.length, length - 1)].current?.focus();
    e.preventDefault();
  };
 
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
      <div className="flex gap-2">
        {values.map((v, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={v}
            maxLength={1}
            inputMode="numeric"
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            className={[
              "w-11 h-13 text-center text-xl font-semibold border rounded-lg outline-none",
              "transition-all duration-150 bg-white text-gray-900",
              "border-gray-200 focus:ring-4",
              th.focus,
              v ? "border-gray-300" : "",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
 
// ─── EXPORT ──────────────────────────────────────────────────────────────────

export { Input };
export default Input;