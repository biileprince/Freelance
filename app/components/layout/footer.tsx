import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  services: [
    { label: "E-Commerce", href: "/#services" },
    { label: "Business Sites", href: "/#services" },
    { label: "Web Apps", href: "/#services" },
    { label: "Maintenance", href: "/#services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-background mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        {/* Main Footer Grid - 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {/* Brand - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-foreground text-background">
                <span className="text-xs sm:text-sm font-bold">W</span>
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight">
                WebAxiom
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs mb-4 sm:mb-6">
              Building modern, fast, and secure websites for businesses that
              want to stand out online.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3">
              <Link
                href="https://github.com"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>

          {/* Services - 1 col on mobile */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - 1 col on mobile */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA - Full width on smallest, 1 col on mobile grid */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Ready to start?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Let&apos;s discuss your next project.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-9 sm:h-10 items-center justify-center rounded-full bg-foreground px-4 sm:px-6 text-xs sm:text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:pt-8 sm:flex-row">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} WebAxiom. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
