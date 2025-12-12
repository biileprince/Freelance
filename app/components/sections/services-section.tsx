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
  LucideIcon,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const services: Service[] = [
  {
    title: "Student Associations & Clubs",
    description: "Showcase your events, members, and activities.",
    icon: GraduationCap,
    color: "text-blue-500",
  },
  {
    title: "Corporate & Business Websites",
    description: "Professional online presence for your company.",
    icon: Building2,
    color: "text-violet-500",
  },
  {
    title: "E-Commerce Stores",
    description:
      "Full online shops with product catalogs and secure payment processing.",
    icon: ShoppingCart,
    color: "text-green-500",
  },
  {
    title: "Blog & Content Platforms",
    description: "SEO-friendly websites built for engaging your audience.",
    icon: PenTool,
    color: "text-orange-500",
  },
  {
    title: "Personal Brand & Landing Pages",
    description: "Powerful website to capture leads and showcase your work.",
    icon: UserCircle,
    color: "text-pink-500",
  },
  {
    title: "Website Maintenance & Support",
    description:
      "Updates, bug fixes, and ongoing management for existing sites.",
    icon: Wrench,
    color: "text-cyan-500",
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
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What I Can Build For You
            </h2>
            <p className="text-lg text-muted-foreground">
              I specialize in creating complete, custom websites tailored to
              your specific needs.
              <br className="hidden sm:inline" />
              No project is too big or too small.
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
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

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
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    {/* Hover Arrow */}
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
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
