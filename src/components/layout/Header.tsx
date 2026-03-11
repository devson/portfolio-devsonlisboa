"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteData } from "@/data/content";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/projetos", label: "Projetos" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-crisp px-6 md:px-12 py-6 flex items-center justify-between",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-foreground/5 py-4"
          : "bg-transparent"
      )}
    >
      <Link
        href="/"
        className="font-serif font-medium text-xl tracking-editorial hover:opacity-70 transition-opacity flex flex-col"
      >
        <span>Devson Lisboa</span>
        <span className="font-sans text-[10px] uppercase tracking-widest opacity-60 mt-1">
          Arquitetura & IA
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-sans text-xs uppercase tracking-wide-editorial uppercase transition-all duration-300 relative group overflow-hidden",
              pathname.startsWith(link.href)
                ? "text-foreground font-medium"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            <span className="relative z-10 inline-block group-hover:-translate-y-full transition-transform duration-300 ease-crisp">
              {link.label}
            </span>
            <span className="absolute left-0 top-0 translate-y-full group-hover:translate-y-0 text-foreground font-medium transition-transform duration-300 ease-crisp">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button - Minimalist lines */}
      <button className="md:hidden flex flex-col gap-1.5 p-2 group">
        <span className="w-6 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-4" />
        <span className="w-4 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-6" />
      </button>
    </header>
  );
}
