import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import StoreProvider from "@/store/storeProvider";
import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hrms",
  description:
    "A modern HR management system built with Next.js, React, and TypeScript. Streamline your HR processes with features like employee management, attendance tracking, and performance reviews. Designed for modern teams to enhance productivity and engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <Providers>
          <StoreProvider>{children}</StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
