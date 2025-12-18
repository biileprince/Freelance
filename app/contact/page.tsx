import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | WebAxiom",
  description:
    "Get in touch with WebAxiom for your web development needs. Let's discuss your project and bring your vision to life.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-16 sm:pt-32 sm:pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Get in Touch
          </div>
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-emerald-600 dark:text-emerald-500">
            Let&apos;s work together
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Whether you
            need a new website, a redesign, or custom development, let&apos;s
            chat.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            <div className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:biileprinceyennuyar5@gmail.com"
                      className="text-sm sm:text-base font-medium hover:text-foreground/80 transition-colors"
                    >
                      biileprinceyennuyar5@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+233555902675"
                      className="text-sm sm:text-base font-medium hover:text-foreground/80 transition-colors"
                    >
                      0555 902 675
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                      Location
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      Available Worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                      Response Time
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Quick Links
              </h2>
              <div className="space-y-3">
                <Link
                  href="/work"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                >
                  <span className="text-sm font-medium">View My Work</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                >
                  <span className="text-sm font-medium">About Me</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/#services"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                >
                  <span className="text-sm font-medium">Services</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-5 sm:p-8">
              <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                Send a Message
              </h2>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="w-full h-10 sm:h-11 rounded-lg border border-border bg-background px-3 sm:px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full h-10 sm:h-11 rounded-lg border border-border bg-background px-3 sm:px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs sm:text-sm font-medium mb-2"
                    >
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      className="w-full h-10 sm:h-11 rounded-lg border border-border bg-background px-3 sm:px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs sm:text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      className="w-full h-10 sm:h-11 rounded-lg border border-border bg-background px-3 sm:px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-type"
                    className="block text-xs sm:text-sm font-medium mb-2"
                  >
                    Project Type
                  </label>
                  <input
                    type="text"
                    id="project-type"
                    name="projectType"
                    placeholder="E.g., E-Commerce, Business Website, Landing Page"
                    className="w-full h-10 sm:h-11 rounded-lg border border-border bg-background px-3 sm:px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs sm:text-sm font-medium mb-2"
                  >
                    Estimated Budget
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    placeholder="E.g., $2,000 - $5,000"
                    className="w-full h-10 sm:h-11 rounded-lg border border-border bg-background px-3 sm:px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full rounded-lg border border-border bg-background px-3 sm:px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 sm:h-12 rounded-full bg-foreground text-background font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>

                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
