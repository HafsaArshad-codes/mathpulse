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
  return (
    <button
      className={cn(
        "relative rounded-lg transition-all duration-150 font-medium",
        variant === "operator"
          ? "bg-calc-operator text-white shadow-[var(--calc-operator-shadow-3d)] hover:shadow-[var(--calc-operator-shadow-3d-hover)] active:shadow-[var(--calc-operator-shadow-3d-active)]"
          : "bg-calc-button text-foreground shadow-[var(--calc-shadow-3d)] hover:shadow-[var(--calc-shadow-3d-hover)] active:shadow-[var(--calc-shadow-3d-active)]",
        "active:translate-y-1",
        disabled && "opacity-50 cursor-not-allowed shadow-none",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ThreeDButton;
