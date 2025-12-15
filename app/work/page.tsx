"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with product management, shopping cart, secure checkout, and admin dashboard. Built with Next.js, Stripe, and PostgreSQL.",
    category: "E-Commerce",
    image: "/projects/ecommerce-placeholder.jpg",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Corporate Business Website",
    description:
      "Professional website for a consulting firm featuring service pages, team profiles, blog, and contact forms. Optimized for SEO and performance.",
    category: "Corporate",
    image: "/projects/corporate-placeholder.jpg",
    tags: ["Next.js", "React", "CMS", "SEO"],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Student Association Portal",
    description:
      "Community platform with event management, member directory, photo galleries, and news updates for a university student organization.",
    category: "Community",
    image: "/projects/student-placeholder.jpg",
    tags: ["React", "Node.js", "MongoDB", "Authentication"],
    liveUrl: "https://example.com",
  },
  {
    title: "Content Management Blog",
    description:
      "Modern blogging platform with rich text editor, SEO optimization, social sharing, and comment system. Built with MDX for enhanced content.",
    category: "Blog",
    image: "/projects/blog-placeholder.jpg",
    tags: ["Next.js", "MDX", "Prisma", "SEO"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Personal Portfolio Site",
    description:
      "Creative portfolio website showcasing work samples, case studies, and client testimonials with smooth animations and mobile-first design.",
    category: "Portfolio",
    image: "/projects/portfolio-placeholder.jpg",
    tags: ["React", "Framer Motion", "Tailwind", "Responsive"],
    liveUrl: "https://example.com",
  },
  {
    title: "Booking & Reservation System",
    description:
      "Custom web application for appointment scheduling with calendar integration, automated reminders, and payment processing.",
    category: "Web App",
    image: "/projects/booking-placeholder.jpg",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Email"],
    liveUrl: "https://example.com",
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

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative bg-background pt-32 pb-20 lg:pt-40">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Portfolio
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
              Recent Work
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
              A selection of projects I&apos;ve built for clients across various
              industries. Each project is crafted with attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={item}
                className={
                  project.featured ? "md:col-span-2 lg:col-span-2" : ""
                }
              >
                <Card className="group h-full overflow-hidden border-border transition-all hover:border-border/80 hover:shadow-lg">
                  {/* Project Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-muted to-muted/50">
                      <span className="text-sm font-medium text-muted-foreground">
                        Project Image
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4 p-6">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {project.category}
                        </span>
                        <div className="flex gap-1">
                          {project.liveUrl && (
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="h-8 w-8 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          {project.githubUrl && (
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="h-8 w-8 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Github className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 text-center"
          >
            <p className="mb-6 text-lg text-muted-foreground">
              Interested in working together?
            </p>
            <Link href="/#contact">
              <Button
                size="lg"
                className="h-12 rounded-full px-8 font-semibold group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
