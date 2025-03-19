import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className?: string;
  variant?: "default" | "ghost" | "destructive" | "destructive-ghost";
  size?: "default" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  className,
  children,
  size = "default",
  variant = "default",
  onClick,
}: ButtonProps) => {
  const baseClassName =
    "cursor-pointer flex items-center justify-center gap-1 h-10 px-3 rounded-xl transition-all duration-150 text-sm font-semibold text-white";
  const defaultClassName =
    "bg-primary hover:bg-primary/80 active:bg-primary/70";
  const ghostClassName = "bg-transparent hover:bg-hover/30 text-foreground";
  const destructiveClassName =
    "bg-destructive hover:bg-destructive/80 active:bg-destructive/70";
  const destructiveGhostClassName =
    "text-destructive hover:bg-destructive/10 active:bg-destructive/5";

  let selectedClassName;

  switch (variant) {
    case "ghost":
      selectedClassName = ghostClassName;
      break;
    case "destructive":
      selectedClassName = destructiveClassName;
      break;
    case "destructive-ghost":
      selectedClassName = destructiveGhostClassName;
      break;
    default:
      selectedClassName = defaultClassName;
      break;
  }

  switch (size) {
    case "icon":
      selectedClassName += " p-0 w-10 rounded-full";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={twMerge(baseClassName, selectedClassName, className)}
    >
      {children}
    </button>
  );
};

export default Button;
