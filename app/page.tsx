import { HeroSection } from "./components/sections/hero-section";
import { ServicesSection } from "./components/sections/services-section";
import { TechStackMarquee } from "./components/sections/tech-stack-marquee";
import { ContactSection } from "./components/sections/contact-section";
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

      <HeroSection />
      <ServicesSection />
      <TechStackMarquee />
      <ContactSection />
    </>
  );
}
