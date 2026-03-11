import { createElement } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
}

export function Display({ children, as = "h1", className }: TypographyProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-serif font-medium tracking-editorial text-balance",
        "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
        className
      ),
    },
    children
  );
}

export function Heading({ children, as = "h2", className }: TypographyProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-serif font-medium tracking-editorial text-balance",
        "text-3xl sm:text-4xl md:text-5xl",
        className
      ),
    },
    children
  );
}

export function HeadingSmall({ children, as = "h3", className }: TypographyProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-sans font-medium tracking-tight",
        "text-xl sm:text-2xl",
        className
      ),
    },
    children
  );
}

export function BodyText({ children, as = "p", className }: TypographyProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-sans font-normal leading-relaxed text-balance text-foreground/80",
        "text-base sm:text-lg",
        className
      ),
    },
    children
  );
}

export function Label({ children, as = "span", className }: TypographyProps) {
  return createElement(
    as,
    {
      className: cn(
        "font-sans font-medium uppercase tracking-wide-editorial text-xs text-foreground/60",
        className
      ),
    },
    children
  );
}
