import type { Metadata } from "next";
import GlobalClient from "./components/GlobalClient";
import { ResumeModalProvider } from "./contexts/ResumeModalContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ray's Den",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-black">
        <ResumeModalProvider>
          <GlobalClient />
          <div className="relative z-10">{children}</div>
        </ResumeModalProvider>
      </body>
    </html>
  );
}
