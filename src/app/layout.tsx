import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "V2.0 - Seu Melhor Eu | Coach de Alta Performance",
  description: "Coach de IA que gerencia sua disciplina e te transforma na melhor versão de você mesmo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
