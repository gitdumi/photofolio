import { cn } from "@/lib/utils";
import React from "react";
import { LinkProps } from "next/link";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "simple" | "outline" | "primary" | "muted";
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  href?: LinkProps["href"];
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  as: Tag = "button",
  className,
  children,
  ...props
}) => {
  const variantClass =
    variant === "simple"
      ? "neutral"
      : variant === "outline"
      ? "btn-outline"
      : variant === "primary"
      ? "btn-primary"
      : variant === "muted"
      ? "btn-ghost"
      : "netural";
  return (
    <Tag
      className={cn(
        // "px-2 bg-secondary relative z-10 bg-transparent hover:border-secondary hover:bg-secondary/50  border border-transparent text-primary text-sm md:text-sm transition font-medium duration-200  rounded-md px-4 py-2 flex items-center justify-center ",
        "btn px2",
        variantClass,
        className,
        "customButton"
      )}
      {...props}
    >
      {children ?? `Get Started`}
    </Tag>
  );
};
