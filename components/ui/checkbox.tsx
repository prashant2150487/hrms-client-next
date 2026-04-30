// Checkbox.tsx — "Remember Me" style
import { useState, useRef, useEffect } from "react";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color = "purple" | "blue" | "green" | "coral" | "amber" | "rose";
type Align = "left" | "right";

interface CheckboxProps {
  label?: string;
  size?: Size;
  color?: Color;
  align?: Align;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

const SIZES = {
  xs: { box: 18, icon: 10, r: 5, gap: 7, text: 12 },
  sm: { box: 22, icon: 13, r: 6, gap: 8, text: 13 },
  md: { box: 28, icon: 16, r: 8, gap: 10, text: 15 },
  lg: { box: 34, icon: 20, r: 10, gap: 12, text: 16 },
  xl: { box: 42, icon: 24, r: 12, gap: 14, text: 18 },
};

const COLORS = {
  purple: "#6B63D8",
  blue: "#378ADD",
  green: "#4CAF50",
  coral: "#D85A30",
  amber: "#E59C1A",
  rose: "#E05B8B",
};

export const Checkbox = ({
  label,
  size = "md",
  color = "purple",
  align = "left",
  checked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  onChange,
}: CheckboxProps) => {
  const [internal, setInternal] = useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internal;
  const s = SIZES[size];
  const bg = COLORS[color];

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) setInternal(next);
    onChange?.(next);
  };

  const boxStyle = {
    width: s.box,
    height: s.box,
    borderRadius: s.r,
    background: isChecked ? bg : "transparent",
    border: `2px solid ${isChecked ? bg : "#ccc"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    flexShrink: 0,
  };

  return (
    <label
      onClick={toggle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        cursor: disabled ? "not-allowed" : "pointer",
        flexDirection: align === "right" ? "row-reverse" : "row",
        opacity: disabled ? 0.45 : 1,
        userSelect: "none",
      }}
    >
      <input
        ref={inputRef}
        type="checkbox"
        style={{ display: "none" }}
        checked={isChecked}
        onChange={() => {}}
      />
      <span style={boxStyle}>
        {(isChecked || indeterminate) && (
          <svg width={s.icon} height={s.icon} viewBox="0 0 16 16" fill="none">
            {indeterminate ? (
              <line
                x1="3"
                y1="8"
                x2="13"
                y2="8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ) : (
              <polyline
                points="2.5,8.5 6.5,12.5 13.5,4"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        )}
      </span>
      {label && (
        <span style={{ fontSize: s.text, fontWeight: 400, color: "#16151C" }}>
          {label}
        </span>
      )}
    </label>
  );
};
