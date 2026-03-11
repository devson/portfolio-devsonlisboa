import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  title: "Arquiteto Devson Lisboa",
  description: "Arquiteto, Artista Visual e Estrategista Criativo orientado por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col pt-24 md:pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
