"use client";
import { forwardRef } from "react";

const VARIANTS = {
  primary:
    "bg-[oklch(96%_0.008_15)] text-[var(--dark)] hover:bg-[oklch(90%_0.006_20)]",
  ghost:
    "bg-transparent text-[var(--text-inv)] border border-white/20 hover:bg-white/10",
  rose: "bg-[var(--rose)] text-[var(--dark)] hover:bg-[oklch(73%_0.05_15)]",
};

export const Button = forwardRef(function Button(
  {
    children,
    onClick,
    variant = "primary",
    type = "button",
    className = "",
    ariaLabel,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`cursor-pointer rounded-full border-0 px-[22px] py-2.5 font-sans text-[0.82rem] font-medium tracking-[0.03em] transition-all duration-200 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
