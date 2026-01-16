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
    default:
      "AxiomCraft | Freelance Web Developer & App Developer in Ghana | Build Your Website",
    template: "%s | AxiomCraft - Professional Web Development",
  },
  description:
    "Need a website or mobile app? AxiomCraft is a professional freelance web developer and app developer in Ghana. We build stunning, fast, SEO-optimized websites, e-commerce stores, and mobile apps for businesses worldwide. Get a free quote today!",
  keywords: getAllKeywords(),
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
    siteName: "AxiomCraft",
    title:
      "AxiomCraft | Freelance Web Developer & App Developer in Ghana | Build Your Website",
    description:
      "Need a website or mobile app? Professional freelance web developer in Ghana. We build stunning websites, e-commerce stores, and mobile apps for businesses worldwide. Fast, SEO-optimized, and affordable.",
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
    title: "AxiomCraft | Freelance Web Developer & App Developer in Ghana",
    description:
      "Need a website or mobile app? Professional freelance web developer in Ghana. Build stunning websites, e-commerce stores, and mobile apps. Fast & affordable!",
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
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#10b981",
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
