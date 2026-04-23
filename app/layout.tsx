import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  title: "Create Next App",
  description: "Notes application with auth",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
        <TanStackProvider>
          <AuthProvider>
              <Header />
              <Toaster position="top-right" reverseOrder={false} />
              <main style={{ flex: 1 }}>{children}</main>
              {modal}
              <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}