import { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Lightbulb,
  Rocket,
  Heart,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Users,
} from "lucide-react";
import {
  generatePersonSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-org";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.axiomcraft.dev";

export const metadata: Metadata = {
  title: "About AxiomCraft | Freelance Web Developer & App Developer in Ghana",
  description:
    "Meet AxiomCraft - a passionate freelance web developer and app developer based in Ghana. With 5+ years of experience, we create stunning, high-performance websites and mobile apps for businesses worldwide. Learn about our story, values, and expertise.",
  keywords: [
    "about axiomcraft",
    "freelance web developer ghana",
    "web developer accra",
    "app developer ghana",
    "professional web developer",
    "experienced developer ghana",
    "full stack developer",
    "react developer",
    "next.js expert",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title:
      "About AxiomCraft | Freelance Web Developer & App Developer in Ghana",
    description:
      "Meet AxiomCraft - a passionate freelance web developer based in Ghana. 5+ years of experience creating stunning websites and mobile apps for businesses worldwide.",
    url: `${SITE_URL}/about`,
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/about-og.jpg`,
        width: 1200,
        height: 630,
        alt: "About AxiomCraft - Freelance Web Developer in Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AxiomCraft | Freelance Web Developer Ghana",
    description:
      "Meet AxiomCraft - a passionate freelance web developer based in Ghana with 5+ years of experience.",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Clear Communication",
    description:
      "No tech jargon. I explain everything in plain language and keep you informed throughout the entire process.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description:
      "I deliver on time and build websites that are blazing fast. Your visitors won't wait around for slow pages.",
  },
  {
    icon: Shield,
    title: "Quality & Security",
    description:
      "Every website is built with security best practices and clean, maintainable code that stands the test of time.",
  },
  {
    icon: Heart,
    title: "Client-Focused",
    description:
      "Your success is my success. I'm not happy until you're thrilled with the final result and seeing real results.",
  },
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24h", label: "Response Time" },
];

const SITE_URL_CONST =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.axiomcraft.dev";

export default function AboutPage() {
  const personSchema = generatePersonSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL_CONST },
    { name: "About", url: `${SITE_URL_CONST}/about` },
  ]);

  return (
    <main className="relative min-h-screen bg-background">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-16 sm:pt-32 sm:pb-24 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            About Me
          </div>
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Building the web,{" "}
            <span className="text-muted-foreground">one site at a time</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I&apos;m a full-stack web developer passionate about creating
            beautiful, functional websites that help businesses grow online.
            From simple landing pages to complex web applications, I bring ideas
            to life with clean code and thoughtful design.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 sm:mb-24">
          <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-16 sm:mb-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 sm:mb-6">
                My Story
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  I started coding years ago, fascinated by the idea of creating
                  something from nothing. What began as a hobby quickly became a
                  passion, and eventually, a career I love.
                </p>
                <p>
                  Over the years, I&apos;ve had the privilege of working with
                  businesses of all sizes, from local shops wanting their first
                  online presence to established companies needing custom web
                  applications. Each project taught me something new and
                  reinforced my belief that great websites can truly transform
                  businesses.
                </p>
                <p>
                  Today, I focus on creating websites that don&apos;t just look
                  good, they perform. Fast loading times, mobile-friendly
                  designs, and SEO best practices are built into everything I
                  create. Because a beautiful website that no one can find or
                  use isn&apos;t really serving its purpose.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-border bg-muted/30 aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 mx-auto items-center justify-center rounded-2xl bg-foreground text-background mb-4 sm:mb-6">
                    <Code2 className="h-10 w-10 sm:h-12 sm:w-12" />
                  </div>
                  <p className="text-lg sm:text-xl font-semibold mb-2">
                    AxiomCraft
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Web Development Studio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">
              What I Stand For
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide every project I take on.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-5 sm:p-6 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/50 mb-4">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16 sm:mb-24">
          <div className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-6 sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 sm:mb-6">
                  What I Can Do
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  I&apos;ve spent years mastering modern web technologies to
                  deliver the best possible results for my clients.
                </p>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-medium hover:text-foreground/80 transition-colors group"
                >
                  See my work
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Frontend Development (React, Next.js, TypeScript)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Backend Development (Node.js, NestJS, PHP)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                  <span className="text-sm sm:text-base">
                    Database Design (PostgreSQL, MongoDB, Prisma)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                  <span className="text-sm sm:text-base">
                    E-Commerce Solutions (Stripe, Shopify, Custom)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                  <span className="text-sm sm:text-base">
                    UI/UX Design & Responsive Layouts
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                  <span className="text-sm sm:text-base">
                    SEO, Performance Optimization & Analytics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="rounded-2xl border border-border bg-muted/30 p-8 sm:p-12">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">
              Ready to start your project?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
              Let&apos;s talk about your ideas and how I can help bring them to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-foreground px-6 sm:px-8 text-sm sm:text-base font-semibold text-background hover:opacity-90 transition-opacity"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full border border-border px-6 sm:px-8 text-sm sm:text-base font-semibold hover:bg-accent transition-colors"
              >
                <Rocket className="mr-2 h-4 w-4" />
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
