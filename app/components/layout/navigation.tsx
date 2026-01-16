"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ShoppingCart,
  Building2,
  GraduationCap,
  Smartphone,
  Database,
  Sparkles,
  Code2,
  Users,
  Mail,
  FileQuestion,
  LogOut,
  LayoutDashboard,
  User,
  PenSquare,
  Briefcase,
  FileText,
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
    icon: Smartphone,
    title: "Mobile Apps",
    description: "iOS & Android with React Native",
    href: "/#services",
  },
  {
    icon: Database,
    title: "Web Apps",
    description: "Custom web applications",
    href: "/#services",
  },
  {
    icon: GraduationCap,
    title: "Organizations",
    description: "Club & association sites",
    href: "/#services",
  },
  {
    icon: Sparkles,
    title: "& Much More",
    description: "Any website or app you need",
    href: "/#services",
  },
];

const companyItems = [
  {
    icon: Code2,
    title: "Work",
    description: "View our portfolio",
    href: "/work",
  },
  {
    icon: Users,
    title: "About",
    description: "Learn about us",
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
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [companyOpen, setCompanyOpen] = React.useState(true);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const { data: session, isPending } = useSession();
  const [isAdmin, setIsAdmin] = React.useState(false);

  // Check if user is admin
  React.useEffect(() => {
    if (session?.user) {
      fetch("/api/auth/check-admin")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
            ? "border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
            : "border-b border-transparent bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
        }`}
      >
        <nav className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md">
              <Code2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight">
              AxiomCraft
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
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
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
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-105 rounded-xl border border-border/50 shadow-2xl z-[999] supports-[backdrop-filter]:bg-background/80"
                    style={{
                      background: "hsl(var(--background) / 0.95)",
                      backdropFilter: "blur(40px) saturate(180%)",
                      WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    }}
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
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
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
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-70 rounded-xl border border-border/50 p-2 shadow-2xl z-[999] supports-[backdrop-filter]:bg-background/80"
                    style={{
                      background: "hsl(var(--background) / 0.95)",
                      backdropFilter: "blur(40px) saturate(180%)",
                      WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    }}
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
              href="/blog"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Contact
            </Link>

            {/* Client Links - Only show when logged in and not admin */}
            {session?.user && !isAdmin && (
              <>
                <Link
                  href="/dashboard/projects"
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  My Projects
                </Link>
                <Link
                  href="/dashboard/invoices"
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Invoices
                </Link>
              </>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            {isPending ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            ) : session?.user ? (
              <>
                {/* User Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("user")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="text-xs font-medium">
                          {session.user.name?.charAt(0) ||
                            session.user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="max-w-[100px] truncate">
                      {session.user.name || session.user.email?.split("@")[0]}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === "user" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "user" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border/50 p-2 shadow-2xl"
                        style={{
                          background: "hsl(var(--background) / 0.95)",
                          backdropFilter: "blur(40px) saturate(180%)",
                          WebkitBackdropFilter: "blur(40px) saturate(180%)",
                        }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="mb-2 border-b border-border pb-2 px-3 py-2">
                          <p className="text-sm font-medium">
                            {session.user.name || "User"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user.email}
                          </p>
                        </div>
                        <Link
                          href={isAdmin ? "/admin" : "/dashboard"}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {isAdmin ? (
                            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                          {isAdmin ? "Admin Panel" : "Dashboard"}
                        </Link>
                        <button
                          onClick={async () => {
                            setActiveDropdown(null);
                            await signOut();
                            window.location.href = "/";
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="group rounded-full px-5 font-medium shadow-none bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  >
                    Get Started
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </>
            )}
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

        {/* Mobile Menu - Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-md lg:hidden"
                onClick={() => setIsOpen(false)}
                style={{ height: "100vh", width: "100vw" }}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 z-50 w-80 h-screen bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl lg:hidden overflow-y-auto"
                style={{
                  height: "100vh",
                  background: "hsl(var(--background) / 0.95)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                        <span className="text-sm font-bold">A</span>
                      </div>
                      <span className="text-lg font-bold">AxiomCraft</span>
                    </Link>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg p-2 hover:bg-accent"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-6">
                    {/* User Info */}
                    {session?.user && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        {session.user.image ? (
                          <Image
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <span className="text-sm font-medium">
                              {session.user.name?.charAt(0) ||
                                session.user.email?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {session.user.name || "User"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Services Section */}
                    <div>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2 hover:text-foreground transition-colors"
                      >
                        <span>Services</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1">
                              {servicesItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent group"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 group-hover:bg-muted">
                                      <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium">
                                        {item.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Company Section */}
                    <div className="pt-3 border-t border-border">
                      <button
                        onClick={() => setCompanyOpen(!companyOpen)}
                        className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2 hover:text-foreground transition-colors"
                      >
                        <span>Company</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            companyOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {companyOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1">
                              {companyItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                      {item.title}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Quick Links */}
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                        Quick Links
                      </p>
                      <div className="space-y-1">
                        <Link
                          href="/blog"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                          onClick={() => setIsOpen(false)}
                        >
                          <PenSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Blog</span>
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                          onClick={() => setIsOpen(false)}
                        >
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Contact</span>
                        </Link>
                      </div>
                    </div>

                    {/* Client Links - Only for logged in non-admin users */}
                    {session?.user && !isAdmin && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                          My Account
                        </p>
                        <div className="space-y-1">
                          <Link
                            href="/dashboard/projects"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                            onClick={() => setIsOpen(false)}
                          >
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              My Projects
                            </span>
                          </Link>
                          <Link
                            href="/dashboard/invoices"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                            onClick={() => setIsOpen(false)}
                          >
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Invoices
                            </span>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-2 pt-3 border-t border-border">
                      {session?.user ? (
                        <>
                          <Link
                            href={isAdmin ? "/admin" : "/dashboard"}
                            onClick={() => setIsOpen(false)}
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-center rounded-full h-11"
                            >
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              {isAdmin ? "Admin Panel" : "Dashboard"}
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            className="w-full justify-center rounded-full h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={async () => {
                              setIsOpen(false);
                              await signOut();
                              window.location.href = "/";
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button
                              variant="outline"
                              className="w-full justify-center rounded-full h-11 cursor-pointer"
                            >
                              Log in
                            </Button>
                          </Link>
                          <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                          >
                            <Button className="w-full justify-center rounded-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer">
                              Get Started
                              <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
