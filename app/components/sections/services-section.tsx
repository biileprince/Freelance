"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import {
  GraduationCap,
  Building2,
  ShoppingCart,
  PenTool,
  UserCircle,
  Wrench,
  Smartphone,
  Database,
  Sparkles,
  LucideIcon,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

const services: Service[] = [
  {
    title: "E-Commerce Stores",
    description:
      "Full-featured online stores with payment processing, inventory systems, and customer management. From boutique shops to large-scale marketplaces.",
    icon: ShoppingCart,
    color: "text-green-500",
    features: [
      "Payment Integration (Stripe, PayPal)",
      "Inventory Management",
      "Customer Dashboards",
      "Order Tracking",
    ],
  },
  {
    title: "Corporate & Business Websites",
    description:
      "Professional websites that establish credibility and drive business growth with modern design and functionality.",
    icon: Building2,
    color: "text-violet-500",
    features: [
      "Company Profiles",
      "Service Pages",
      "Contact Forms",
      "Team Showcases",
    ],
  },
  {
    title: "Student Associations & Clubs",
    description:
      "Dynamic platforms to showcase events, manage memberships, and engage your community effectively.",
    icon: GraduationCap,
    color: "text-blue-500",
    features: [
      "Event Calendars",
      "Member Portals",
      "News & Updates",
      "Photo Galleries",
    ],
  },
  {
    title: "Blog & Content Platforms",
    description:
      "SEO-optimized content management systems designed to engage readers and grow your audience.",
    icon: PenTool,
    color: "text-orange-500",
    features: [
      "CMS Integration",
      "SEO Optimization",
      "Social Sharing",
      "Comment Systems",
    ],
  },
  {
    title: "Landing Pages & Portfolios",
    description:
      "High-converting pages that capture leads, showcase your work, and establish your personal brand.",
    icon: UserCircle,
    color: "text-pink-500",
    features: [
      "Lead Capture",
      "Project Showcases",
      "Contact Forms",
      "Social Links",
    ],
  },
  {
    title: "Mobile-First Web Apps",
    description:
      "Progressive web applications optimized for mobile devices with offline capabilities and app-like experiences.",
    icon: Smartphone,
    color: "text-indigo-500",
    features: [
      "Responsive Design",
      "PWA Features",
      "Touch Optimized",
      "Fast Loading",
    ],
  },
  {
    title: "Custom Web Applications",
    description:
      "Tailored solutions for unique business needs including dashboards, booking systems, and internal tools.",
    icon: Database,
    color: "text-cyan-500",
    features: [
      "Custom Features",
      "Database Design",
      "API Integration",
      "User Authentication",
    ],
  },
  {
    title: "Website Redesign & Migration",
    description:
      "Transform outdated websites into modern, performant platforms with seamless data migration.",
    icon: Sparkles,
    color: "text-yellow-500",
    features: [
      "Modern Design",
      "Performance Boost",
      "Data Migration",
      "SEO Preservation",
    ],
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing updates, security patches, bug fixes, and technical support to keep your website running smoothly.",
    icon: Wrench,
    color: "text-red-500",
    features: [
      "Regular Updates",
      "Bug Fixes",
      "Security Monitoring",
      "Performance Optimization",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full border-b border-border/40 bg-background py-24 md:py-32"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              I Can Build Anything You Need
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              From simple websites to complex web applications—if you can
              imagine it, I can build it.
              <br className="hidden sm:block" />
              Here are some common projects I specialize in, but I&apos;m not
              limited to these.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                className={index === 2 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Card className="group relative h-full overflow-hidden border-border bg-card p-6 transition-all hover:shadow-lg">
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative space-y-4">
                    {/* Icon */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background/50">
                      <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="mb-2 text-xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="border-t border-border/50 pt-4">
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
