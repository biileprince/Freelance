export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "WebAxiom",
    description:
      "Professional freelance web development services. Transforming ideas into fast, secure, and fully-functional websites.",
    url: "https://webaxiom.com",
    serviceType: "Web Development",
    areaServed: "Worldwide",
    offers: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Student Associations & Clubs Websites",
          description: "Showcase your events, members, and activities.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate & Business Websites",
          description: "Professional online presence for your company.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce Stores",
          description:
            "Full online shops with product catalogs and secure payment processing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Blog & Content Platforms",
          description:
            "SEO-friendly websites built for engaging your audience.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Personal Brand & Landing Pages",
          description:
            "Powerful website to capture leads and showcase your work.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Maintenance & Support",
          description:
            "Updates, bug fixes, and ongoing management for existing sites.",
        },
      },
    ],
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "WebAxiom",
    jobTitle: "Freelance Web Developer",
    description:
      "Full-stack web developer specializing in Next.js, React, and modern web technologies.",
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Full Stack Development",
      "E-Commerce Development",
      "SEO",
    ],
  };
}
