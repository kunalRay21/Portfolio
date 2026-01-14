import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Loader from "./components/Loader";
import Hamburger from "./components/Hamburger";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kunal Ray",
  description: "Frontend systems, built with intent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#376153]`}
      >
        <Hamburger />
        <Loader />
        {children}
      </body>
    </html>
  );
}
