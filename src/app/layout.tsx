import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Open_Sans } from 'next/font/google';
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // pesos que você quiser usar
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DEV Controle - Sistema de Gerenciamento",
  description: "Gerencie seus clientes e atendimentos de forma fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={openSans.className}>
      <body>
          <AuthProvider>
            <ModalProvider>
              <Header />
              {children}
            </ModalProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
