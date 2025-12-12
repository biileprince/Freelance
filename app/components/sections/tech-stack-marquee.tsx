"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiMongodb,
  SiStripe,
  SiVercel,
  SiGit,
  SiDocker,
  SiNestjs,
  SiPhp,
} from "react-icons/si";

const technologies = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    darkColor: "#FFFFFF",
  },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748", darkColor: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Vercel", icon: SiVercel, color: "#000000", darkColor: "#FFFFFF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

export function TechStackMarquee() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full border-b border-border/40 bg-muted/30 py-12 relative overflow-hidden">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      <div className="container mb-8 relative z-10">
        <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Technologies I Work With
        </h3>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background to-transparent" />

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
            (tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex min-w-35 flex-col items-center justify-center gap-3 transition-all hover:scale-105"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
                    <Icon
                      className="h-8 w-8"
                      style={{
                        color:
                          isDark && tech.darkColor
                            ? tech.darkColor
                            : tech.color,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">
                    {tech.name}
                  </span>
                </div>
              );
            }
          )}
        </motion.div>
      </div>
    </section>
  );
}
