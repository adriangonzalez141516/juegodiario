import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import BottomBar from "@/components/BottomBar";

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
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col pb-16">
        <header className="w-full max-w-4xl mx-auto p-6 flex justify-center items-center">
          <h1 className="text-3xl font-serif font-bold tracking-widest text-[#d4af37] drop-shadow-md">
            EL ENIGMA DIARIO
          </h1>
        </header>
        <main className="flex-1 w-full max-w-4xl mx-auto p-6 flex flex-col items-center">
          {children}
        </main>
        <BottomBar />
      </body>
    </html>
  );
}
