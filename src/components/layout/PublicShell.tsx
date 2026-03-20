"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition, Preloader } from "@/components/ui/PageTransition";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Header />
      <main className="flex-1 flex flex-col pt-24 md:pt-32">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
