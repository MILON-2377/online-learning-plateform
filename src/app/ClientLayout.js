"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/AuthProvider/AuthProvider";

const inter = Poppins({
  weight: ["200", "400", "500", "700"],
  subsets: ["latin"],
});

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
