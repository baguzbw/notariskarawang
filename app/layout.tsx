import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Notaris Norman",
  description: "Notaris Norman & PPAT - Layanan Kenotariatan Profesional",
  icons: {
    icon: "/favicon.svg",
  },
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
