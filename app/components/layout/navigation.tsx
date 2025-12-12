"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
      <nav className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 md:gap-12">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-70"
          >
            <span className="font-mono text-lg font-bold">WebAxiom</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-8">
            <Link
              href="/#services"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/work"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <ThemeToggle />
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/60 hover:text-foreground"
            >
              Login
            </Button>
          </Link>
          <Link href="/#contact">
            <Button size="sm" className="shadow-sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="container mx-auto max-w-7xl border-t border-border/40 bg-background px-4 py-6 md:hidden sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Link
                href="/#services"
                className="text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/work"
                className="text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/#about"
                className="text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-3 border-t border-border/40 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/60">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  Login
                </Button>
              </Link>
              <Link href="/#contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
