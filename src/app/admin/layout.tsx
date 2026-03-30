"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/admin", icon: "◎" },
    { label: "Conteúdo Home", href: "/admin/conteudo", icon: "✎" },
    { label: "Conteúdo Sobre", href: "/admin/sobre", icon: "👤" },
    { label: "Projetos", href: "/admin/projetos", icon: "▦" },
    { label: "Serviços", href: "/admin/servicos", icon: "◈" },
    { label: "Depoimentos", href: "/admin/depoimentos", icon: "❝" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return null;

  return (
    <aside className="w-64 min-h-screen bg-black-obsidian text-off-white flex flex-col shrink-0">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <h2 className="font-serif text-lg font-medium tracking-editorial">Devson Lisboa</h2>
        <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Painel Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-sans tracking-wide transition-colors ${
              isActive(link.href)
                ? "bg-white/10 text-off-white font-medium"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/40 mb-3 px-4">
          {session?.user?.name || "Administrador"}
        </div>
        <div className="flex gap-2 px-4">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            Ver Site
          </Link>
          <span className="text-xs text-white/20">·</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
