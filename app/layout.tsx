import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Fondo } from "./resources/componentes";
import Image from "next/image";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Country Quiz",
  description: "A quiz about countries around the world."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.className} antialiased`}>
        <div className="flex min-h-screen items-center justify-start">
          <Fondo />
          {children}
        </div>
      </body>
    </html>
  );
}
