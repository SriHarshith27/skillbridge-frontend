// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "~/contexts/AuthProvider";
import { Navbar } from "~/components/layout/Navbar"; // 1. Import the Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillBridge",
  description: "Your gateway to mastering new skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar /> {/* 2. Add the Navbar here */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}