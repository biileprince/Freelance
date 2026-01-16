import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

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
                <span className="text-xs sm:text-sm font-bold">A</span>
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight">
                AxiomCraft
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs mb-4 sm:mb-6">
              Building modern, fast, and secure websites for businesses that
              want to stand out online.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3">
              <Link
                href="https://github.com/biileprince"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/prince-biile-75343b244"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link
                href="https://x.com/BiilePrince"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
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

          {/* Contact Info - Full width on smallest, 1 col on mobile grid */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="mailto:biileprinceyennuyar5@gmail.com"
                  className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="break-all">
                    biileprinceyennuyar5@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+233555902675"
                  className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>0555 902 675</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/233555902675"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:pt-8 sm:flex-row">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} AxiomCraft. All rights reserved.
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
