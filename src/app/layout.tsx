import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="es" className={`${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <header className="w-full max-w-4xl mx-auto p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            El Enigma Diario
          </h1>
          <nav>
            {/* Nav placeholder */}
          </nav>
        </header>
        <main className="flex-1 w-full max-w-4xl mx-auto p-6 flex flex-col items-center">
          {children}
        </main>
        <footer className="w-full py-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} El Enigma Diario. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
