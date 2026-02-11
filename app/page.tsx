import { HeroSection } from "./components/sections/hero-section";
import { ServicesSection } from "./components/sections/services-section";
import { TechStackMarquee } from "./components/sections/tech-stack-marquee";
import { TestimonialsSection } from "./components/sections/testimonials-section";
import { FAQSection } from "./components/sections/faq-section";
import { ContactSection } from "./components/sections/contact-section";
import { GoogleOneTap } from "./components/auth/google-one-tap";
import { generateHomePageSchema } from "@/lib/schema-org";
import { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.axiomcraft.dev";

export const metadata: Metadata = {
  title:
    "Axiom Craft | AxiomCraft | Web Developer Ghana | I Need a Website",
  description:
    "Axiom Craft (AxiomCraft) is a top freelance web developer in Ghana. I need a website? We build stunning websites, e-commerce stores, mobile apps, and web applications. Professional, fast, and SEO-optimized. Get a free quote today! Serving Accra, Kumasi, and worldwide.",
  keywords: [
    "freelance web developer",
    "web developer ghana",
    "app developer ghana",
    "i need a website",
    "need a mobile app",
    "build my website",
    "website developer accra",
    "e-commerce website ghana",
    "best web developer ghana",
    "affordable website design",
    "professional website development",
    "hire freelance developer",
    "react developer ghana",
    "next.js developer",
    "mobile app development ghana",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title:
      "Axiom Craft | AxiomCraft | I Need a Website? Ghana Web Developer",
    description:
      "I need a website? Axiom Craft (AxiomCraft) builds stunning websites & mobile apps in Ghana. Rank #1 on Google with our SEO-optimized websites. Affordable & professional web development services!",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AxiomCraft - Professional Freelance Web Developer in Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AxiomCraft | Freelance Web Developer & App Developer Ghana",
    description:
      "Need a website or app? Professional freelance web developer in Ghana. Build stunning websites, e-commerce stores, and mobile apps!",
    images: [`${SITE_URL}/twitter-image.jpg`],
  },
};

export default function Home() {
  const schemas = generateHomePageSchema();

  return (
    <>
      {/* JSON-LD Schema Markup for SEO - Multiple schemas for comprehensive coverage */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Google One Tap for automatic email detection */}
      <GoogleOneTap />

      <HeroSection />
      <ServicesSection />
      <TechStackMarquee />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
