import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = variant === "primary" ? "btn-primary" : "btn-ghost";
  return <button className={`${base} ${className}`.trim()} {...props} />;
}
