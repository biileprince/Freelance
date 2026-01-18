import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/layout/navigation";
import { Footer } from "./components/layout/footer";
import { getAllKeywords } from "@/lib/schema-org";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.axiomcraft.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Axiom Craft | Web Developer Ghana | AxiomCraft",
    template: "%s | Axiom Craft Ghana",
  },
  description:
    "I need a website? Axiom Craft (AxiomCraft) is Ghana's top freelance web developer. We build stunning, fast, SEO-optimized websites, e-commerce stores, and mobile apps for businesses. Need a website built? Contact Axiom Craft today for affordable, professional web development services.",
  keywords: [
    ...getAllKeywords(),
    "axiom craft",
    "axiomcraft",
    "i need a website",
    "need a website",
    "build my website",
    "website developer near me",
    "axiom craft ghana",
    "axiom craft web developer",
    "i need someone to build my website",
    "looking for web developer",
    "hire web developer ghana",
    "axiom craft developer",
  ],
  authors: [
    { name: "AxiomCraft", url: SITE_URL },
    { name: "AxiomCraft Ghana" },
  ],
  creator: "AxiomCraft",
  publisher: "AxiomCraft",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: "technology",
  classification: "Web Development Services",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB"],
    url: SITE_URL,
    siteName: "Axiom Craft | AxiomCraft",
    title: "Axiom Craft | Professional Web Developer Ghana",
    description:
      "Need a website? Axiom Craft (AxiomCraft) is Ghana's leading freelance web developer. We build stunning websites, e-commerce stores, and mobile apps. Affordable, fast, and SEO-optimized web development services.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AxiomCraft - Professional Freelance Web Developer and App Developer in Ghana",
        type: "image/jpeg",
      },
      {
        url: `${SITE_URL}/og-image-square.jpg`,
        width: 600,
        height: 600,
        alt: "AxiomCraft Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@axiomcraft",
    creator: "@axiomcraft",
    title: "Axiom Craft - I Need a Website? Ghana's Top Web Developer",
    description:
      "I need a website? Axiom Craft (AxiomCraft) builds stunning websites, e-commerce stores & mobile apps. Ghana's most affordable web developer. Get your website today!",
    images: [`${SITE_URL}/twitter-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "en-GB": `${SITE_URL}/en-gb`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "51UCvm6DPhB9JQQzHfPBZfmzAYuKlG_YoqtnqXpQQoA",
    yandex: "7d94a8ee010c8182",
    other: {
      "msvalidate.01": "4FBE1C1585CD841FF62A227164FF3065",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AxiomCraft",
  },
  applicationName: "AxiomCraft",
  other: {
    "geo.region": "GH-AA",
    "geo.placename": "Accra, Ghana",
    "geo.position": "5.6037;-0.187",
    ICBM: "5.6037, -0.187",
    "revisit-after": "7 days",
    rating: "general",
    "dc.title":
      "AxiomCraft - Freelance Web Developer and App Developer in Ghana",
    "dc.creator": "AxiomCraft",
    "dc.subject": "Web Development, Mobile App Development, E-Commerce",
    "dc.description":
      "Professional freelance web developer and app developer in Ghana",
    "dc.language": "en",
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
      </body>
    </html>
  );
}
