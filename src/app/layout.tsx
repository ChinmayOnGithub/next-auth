import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextauth",
  description: "Next.js application with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              animation: "slide-in 0.3s ease-in-out, fade-out 0.3s ease-in-out forwards",
              animationDelay: "2.7s",
            },
            success: {
              iconTheme: {
                primary: "#4ade80", // Tailwind green-400
                secondary: "#1e293b", // Tailwind slate-800
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171", // Tailwind red-400
                secondary: "#1e293b",
              },
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
