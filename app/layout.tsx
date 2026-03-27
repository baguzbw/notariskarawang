import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kantor Notaris",
  description: "Kantor Notaris & PPAT - Layanan Kenotariatan Profesional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${outfit.className} bg-cream text-dongker antialiased`}>
        {children}
      </body>
    </html>
  );
}
