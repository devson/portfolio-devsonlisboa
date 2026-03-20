import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/PublicShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Devson Lisboa | Arquiteto, Artista Visual & IA",
    template: "%s | Devson Lisboa",
  },
  description: "Arquiteto multidisciplinar especializado em arquitetura de alto padrão, visualização arquitetônica premium e estratégia criativa com inteligência artificial.",
  metadataBase: new URL("https://devsonlisboa.com"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Devson Lisboa Arquiteto",
    title: "Devson Lisboa | Arquiteto, Artista Visual & IA",
    description: "Arquiteto multidisciplinar especializado em arquitetura de alto padrão, visualização arquitetônica premium e estratégia criativa com inteligência artificial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devson Lisboa | Arquiteto, Artista Visual & IA",
    description: "Arquitetura de alto padrão, archviz e estratégia criativa com IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <PublicShell>
          {children}
        </PublicShell>
      </body>
    </html>
  );
}
