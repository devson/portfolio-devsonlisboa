import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "text";
  className?: string;
  icon?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  icon = false,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-sans font-medium text-sm tracking-wide-editorial uppercase transition-all duration-300 ease-crisp px-6 py-4 relative overflow-hidden group";

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-black-obsidian",
    outline:
      "border border-foreground/20 text-foreground hover:border-foreground",
    text:
      "text-foreground px-0 py-2 hover:opacity-70 !tracking-wide overflow-visible",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight
            size={16}
            className={cn(
              "transition-transform duration-300 ease-crisp",
              variant === "text"
                ? "group-hover:translate-x-1 group-hover:-translate-y-1"
                : "group-hover:rotate-45"
            )}
          />
        )}
      </span>
      {variant === "primary" && (
        <span className="absolute inset-0 z-0 bg-accent-bronze translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-crisp" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className, disabled && "opacity-50 cursor-not-allowed")}
    >
      {content}
    </button>
  );
}
