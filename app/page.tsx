import { HeroSection } from "./components/sections/hero-section";
import { ServicesSection } from "./components/sections/services-section";
import { TechStackMarquee } from "./components/sections/tech-stack-marquee";
import { TestimonialsSection } from "./components/sections/testimonials-section";
import { FAQSection } from "./components/sections/faq-section";
import { ContactSection } from "./components/sections/contact-section";
import { GoogleOneTap } from "./components/auth/google-one-tap";
import {
  generateOrganizationSchema,
  generatePersonSchema,
} from "@/lib/schema-org";

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const personSchema = generatePersonSchema();

  return (
    <>
      {/* JSON-LD Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

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
