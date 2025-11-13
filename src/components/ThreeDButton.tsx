import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ThreeDButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "number" | "operator";
}

const ThreeDButton: React.FC<ThreeDButtonProps> = ({
  children,
  variant = "number",
  className = "",
  disabled = false,
  ...props
}) => {
  const shadowVar = variant === "operator" ? "--calc-operator-shadow-3d" : "--calc-shadow-3d";
  
  return (
    <button
      className={cn(
        "relative rounded-lg transition-all duration-150 font-medium",
        variant === "operator"
          ? "bg-calc-operator text-white"
          : "bg-calc-button text-foreground",
        "active:translate-y-1",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        boxShadow: disabled ? 'none' : `var(${shadowVar})`,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `var(${shadowVar}-hover)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `var(${shadowVar})`;
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `var(${shadowVar}-active)`;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = `var(${shadowVar}-hover)`;
        }
      }}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ThreeDButton;
