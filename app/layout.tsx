import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/layout/navigation";
import { Footer } from "./components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebAxiom | Professional Freelance Web Developer",
  description:
    "Transforming ideas into fast, secure, and fully-functional websites. I build custom websites from the ground up - Frontend, Backend, Everything.",
  keywords: [
    "freelance web developer",
    "web development",
    "next.js developer",
    "full stack developer",
    "custom websites",
    "e-commerce",
    "corporate websites",
  ],
  authors: [{ name: "WebAxiom" }],
  openGraph: {
    title: "WebAxiom | Professional Freelance Web Developer",
    description:
      "Transforming ideas into fast, secure, and fully-functional websites.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
