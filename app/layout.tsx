import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klean - Seu app gerador de feedbacks agéis",
  description: "Klean é um aplicativo web que ajuda pessoas a formular feedbacks eficazes em equipes ágeis, promovendo uma otimização nos processos de melhoria contínua e comunicação clara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
