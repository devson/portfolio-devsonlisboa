"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/projetos", label: "Projetos" },
    { href: "/contato", label: "Contato" },
  ];

  const isHomePage = pathname === "/";
  const isOverDarkBanner = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-crisp px-6 md:px-12 py-6 flex items-center justify-between",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-foreground/5 py-4"
            : "bg-transparent",
          menuOpen && "bg-black-obsidian !py-6"
        )}
      >
        <Link
          href="/"
          className="hover:opacity-70 transition-opacity relative z-[60]"
        >
          <Image
            src="/images/logo.png"
            alt="Devson Lisboa Arquiteto"
            width={160}
            height={56}
            className={cn(
              "transition-all duration-500 ease-crisp",
              isScrolled && !menuOpen ? "h-10 w-auto" : "h-14 w-auto",
              (menuOpen || isOverDarkBanner) && "brightness-0 invert"
            )}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-xs uppercase tracking-wide-editorial transition-all duration-300 relative group overflow-hidden",
                  isOverDarkBanner 
                    ? isActive ? "text-off-white font-medium" : "text-off-white/70 hover:text-off-white"
                    : isActive ? "text-foreground font-medium" : "text-foreground/60 hover:text-foreground"
                )}
              >
                <span className="relative z-10 inline-block group-hover:-translate-y-full transition-transform duration-300 ease-crisp">
                  {link.label}
                </span>
                <span className="absolute left-0 top-0 translate-y-full group-hover:translate-y-0 font-medium transition-transform duration-300 ease-crisp">
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 group relative z-[60] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span
            className={cn(
              "w-6 h-[1.5px] transition-all duration-300 origin-center",
              menuOpen
                ? "bg-off-white rotate-45 translate-y-[3.5px]"
                : cn("group-hover:w-4", isOverDarkBanner ? "bg-off-white" : "bg-foreground")
            )}
          />
          <span
            className={cn(
              "h-[1.5px] transition-all duration-300 origin-center",
              menuOpen
                ? "w-6 bg-off-white -rotate-45 -translate-y-[3.5px]"
                : cn("w-4 group-hover:w-6", isOverDarkBanner ? "bg-off-white" : "bg-foreground")
            )}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black-obsidian transition-all duration-500 ease-crisp flex flex-col justify-center items-center",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-off-white font-serif text-4xl md:text-5xl font-medium tracking-editorial transition-all duration-500 hover:text-accent-bronze py-3",
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
                pathname.startsWith(link.href) && "text-accent-bronze"
              )}
              style={{ transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact info in menu */}
        <div
          className={cn(
            "mt-16 text-center transition-all duration-500",
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
        >
          <p className="font-sans text-xs uppercase tracking-widest text-off-white/40 mb-3">Contato</p>
          <a href="mailto:devson.lisboa@gmail.com" className="font-sans text-sm text-off-white/70 hover:text-off-white transition-colors">
            devson.lisboa@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
