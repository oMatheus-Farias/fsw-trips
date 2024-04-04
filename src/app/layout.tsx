import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/auth";
import Header from "../components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FSW Trips",
  description: "Sistema de Reserva de Viagens",
  authors: [{ name: "Matheus Farias" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
