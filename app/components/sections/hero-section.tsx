"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Database, Layers } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border/40 bg-background">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Available for new projects
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Do you need a website?
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">I develop </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-2 left-0 h-3 bg-primary/20"
              />
            </span>
            <span className="text-primary">any</span> website!
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-xl font-medium text-foreground md:text-2xl"
          >
            I Build Them From The Ground Up.
            <br />
            <span className="text-muted-foreground">
              Frontend. Backend. Everything.
            </span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 text-lg text-muted-foreground"
          >
            Transforming ideas into fast, secure, and fully-functional websites.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/#work">
              <Button size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/#contact">
              <Button size="lg" variant="outline">
                Start a Project
              </Button>
            </Link>
          </motion.div>

          {/* Tech Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-8 text-muted-foreground"
          >
            <div className="flex flex-col items-center gap-2">
              <Layers className="h-8 w-8" />
              <span className="text-xs font-medium">Frontend</span>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="flex flex-col items-center gap-2">
              <Database className="h-8 w-8" />
              <span className="text-xs font-medium">Backend</span>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="flex flex-col items-center gap-2">
              <Code2 className="h-8 w-8" />
              <span className="text-xs font-medium">Full Stack</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
