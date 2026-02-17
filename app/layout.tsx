import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LiquidBackground from "@/components/LiquidBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MT Business - Portfolio",
  description: "Portfolio of María Tavera - UI/UX Design and Front-end Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <LiquidBackground />
        <div className="prism-mesh"></div>
        {children}
      </body>
    </html>
  );
}
