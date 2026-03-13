import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
