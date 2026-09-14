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
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)] overflow-hidden transition-colors duration-300">
        <ThemeProvider>
          {/* 1. Cabecera fija arriba */}
          <header className="fixed top-0 left-0 w-full h-14 sm:h-16 z-40 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--card-border)]/40 flex items-center">
            <div className="w-full max-w-4xl mx-auto px-4 flex justify-between items-center">
              <div className="w-9" /> {/* Spacer para centrar el título */}
              <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-[var(--accent)] drop-shadow-sm">
                EL ENIGMA
              </h1>
              <ThemeToggle />
            </div>
          </header>

          {/* 2. Área central */}
          <main className="w-full">
            {children}
          </main>

          {/* 3. Barra de navegación fija abajo */}
          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
