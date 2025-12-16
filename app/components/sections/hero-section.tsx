"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-60" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Badge - Resend style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8 inline-flex"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-medium text-muted-foreground">
                Available for new projects
              </span>
            </div>
          </motion.div>

          {/* Main Headline - More descriptive for everyone */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 sm:mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-muted-foreground/80 block text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-4">
              Looking for a website?
            </span>
            We build{" "}
            <span className="relative inline-block">
              <span className="text-emerald-500">stunning websites</span>
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            that{" "}
            <span className="text-muted-foreground">grow your business</span>
          </motion.h1>

          {/* Sub-headline - More descriptive */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed px-2"
          >
            Whether you need an online store, business website, or custom web
            app, we design and develop professional websites that attract
            customers and help your business succeed.
          </motion.p>

          {/* Trust points - Quick value props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 text-xs sm:text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
              Fast & Secure
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
              Mobile Friendly
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
              SEO Optimized
            </span>
          </motion.div>

          {/* CTA Buttons - Pill style like Resend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center px-4 sm:px-0"
          >
            <Link href="/#contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group h-11 sm:h-12 w-full sm:w-auto rounded-full px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-none"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/work" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-11 sm:h-12 w-full sm:w-auto rounded-full px-6 sm:px-8 text-sm sm:text-base font-semibold border-border hover:bg-accent"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                View Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
