import type { ReactElement } from "react";

type Variants = "primary" | "secondary";
type Sizes = "sm" | "md" | "lg";

export interface ButtonProps {
  variant: Variants;
  size: Sizes;
  text: string;
  icon?: ReactElement;
  onClick: () => void;
}

const variantStyles: Record<Variants, string> = {
  primary: "dark:bg-tuna-50 dark:text-tuna-950 bg-tuna-500 text-tuna-50",
  secondary: "dark:bg-tuna-700 dark:text-tuna-50 bg-tuna-300 text-tuna-950",
};

const sizeStyles: Record<Sizes, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-md",
};

const Button = ({ variant, size, text, icon, onClick }: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]} flex gap-2 items-center px-4 py-2 rounded-md cursor-pointer`}
      onClick={onClick}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
