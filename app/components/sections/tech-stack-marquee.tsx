"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", logo: "/logos/nextjs.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "TypeScript", logo: "/logos/typescript.svg" },
  { name: "Tailwind CSS", logo: "/logos/tailwind.svg" },
  { name: "Node.js", logo: "/logos/nodejs.svg" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { name: "Prisma", logo: "/logos/prisma.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
];

export function TechStackMarquee() {
  return (
    <section className="w-full border-b border-border/40 bg-muted/30 py-12">
      <div className="container mb-8">
        <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Technologies I Work With
        </h3>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

        {/* Marquee */}
        <motion.div
          className="flex gap-16"
          animate={{
            x: [0, -1200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate the array for seamless loop */}
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex min-w-[120px] flex-col items-center justify-center gap-3 grayscale transition-all hover:grayscale-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background p-2">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {tech.name[0]}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {tech.name}
                </span>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
