import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import BottomBar from "@/components/BottomBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "El Enigma",
  description: "Desafía tu mente cada día con un nuevo rompecabezas lógico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased h-dvh max-h-dvh flex flex-col overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <ThemeProvider>
          {/* 1. Cabecera fija arriba */}
          <header className="w-full max-w-4xl mx-auto px-4 py-2 sm:py-3 flex justify-between items-center shrink-0 border-b border-[var(--card-border)]/40">
            <div className="w-9" /> {/* Spacer para centrar el título */}
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-[var(--accent)] drop-shadow-sm">
              EL ENIGMA
            </h1>
            <ThemeToggle />
          </header>

          {/* 2. Área central: exactamente el alto restante entre header y bottom bar */}
          <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col min-h-0 overflow-hidden">
            {children}
          </main>

          {/* 3. Barra de navegación fija abajo */}
          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
