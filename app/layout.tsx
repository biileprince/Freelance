import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/layout/navigation";
import { Footer } from "./components/layout/footer";
import { GoogleOneTap } from "./components/auth/google-one-tap";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebAxiom | Professional Web Development",
  description:
    "Building modern, fast, and secure websites for businesses that want to stand out. Full-stack development with Next.js, React, and cutting-edge technologies.",
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
    title: "WebAxiom | Professional Web Development",
    description:
      "Building modern, fast, and secure websites for businesses that want to stand out.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased selection:bg-primary/10 overflow-x-hidden`}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <GoogleOneTap />
      </body>
    </html>
  );
}
