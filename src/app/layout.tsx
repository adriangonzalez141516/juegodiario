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
  title: "El Enigma Diario",
  description: "Desafía tu mente cada día con un nuevo rompecabezas lógico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased h-[100dvh] flex flex-col overflow-hidden transition-colors duration-300">
        <ThemeProvider>
          <header className="w-full max-w-4xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center shrink-0">
            <div className="w-9" /> {/* Spacer para centrar el título */}
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[var(--accent)] drop-shadow-md">
              EL ENIGMA DIARIO
            </h1>
            <ThemeToggle />
          </header>
          <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-36 flex flex-col items-center justify-center min-h-0 overflow-y-auto">
            {children}
          </main>
          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
