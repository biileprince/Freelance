"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "@/app/components/theme-toggle";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ShoppingCart,
  Building2,
  GraduationCap,
  PenTool,
  Smartphone,
  Database,
  Sparkles,
  Wrench,
  Code2,
  Users,
  Mail,
  FileQuestion,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const servicesItems = [
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Online stores with payments",
    href: "/#services",
  },
  {
    icon: Building2,
    title: "Business Sites",
    description: "Professional company websites",
    href: "/#services",
  },
  {
    icon: GraduationCap,
    title: "Organizations",
    description: "Club & association sites",
    href: "/#services",
  },
  {
    icon: Database,
    title: "Web Apps",
    description: "Custom applications",
    href: "/#services",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly",
    description: "Responsive PWA apps",
    href: "/#services",
  },
  {
    icon: Sparkles,
    title: "Redesigns",
    description: "Modernize old websites",
    href: "/#services",
  },
];

const companyItems = [
  {
    icon: Code2,
    title: "Work",
    description: "View my portfolio",
    href: "/work",
  },
  {
    icon: Users,
    title: "About",
    description: "Learn about me",
    href: "/about",
  },
  {
    icon: Mail,
    title: "Contact",
    description: "Get in touch",
    href: "/contact",
  },
  {
    icon: FileQuestion,
    title: "FAQ",
    description: "Common questions",
    href: "/#faq",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <span className="text-xs sm:text-sm font-bold">W</span>
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight">
              WebAxiom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-105 rounded-xl border border-border bg-background/95 backdrop-blur-xl p-4 shadow-xl"
                    onMouseEnter={cancelClose}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {servicesItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <Link
                        href="/#services"
                        className="flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors hover:bg-accent group"
                        onClick={() => setActiveDropdown(null)}
                      >
                        View all services
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Company
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "company" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "company" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-70 rounded-xl border border-border bg-background/95 backdrop-blur-xl p-2 shadow-xl"
                    onMouseEnter={cancelClose}
                    onMouseLeave={handleMouseLeave}
                  >
                    {companyItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/work"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Log in
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="sm"
                className="group rounded-full px-5 font-medium shadow-none"
              >
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="rounded-lg p-2 hover:bg-accent"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                {/* Services Section */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-3">
                    Services
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {servicesItems.slice(0, 4).map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Company Section */}
                <div className="mb-4 pt-4 border-t border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-3">
                    Company
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {companyItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2 border-t border-border/50 pt-4">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-center rounded-full h-10"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center rounded-full h-10">
                      Get Started
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
