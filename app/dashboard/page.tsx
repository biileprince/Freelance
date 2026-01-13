import { redirect } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Briefcase,
  FileText,
  DollarSign,
  Clock,
  TrendingUp,
  ArrowRight,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};

async function getDashboardData(userId: string) {
  const [projects, invoices] = await Promise.all([
    prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.invoice.findMany({
      where: {
        project: {
          userId,
        },
      },
      include: {
        project: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  // Calculate stats
  const activeProjects = projects.filter((p) => p.status !== "Live").length;
  const completedProjects = projects.filter((p) => p.status === "Live").length;
  const pendingInvoices = invoices.filter((i) => i.status === "Pending");
  const totalPending = pendingInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );
  const totalPaid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return {
    projects,
    invoices,
    stats: {
      activeProjects,
      completedProjects,
      totalProjects: projects.length,
      pendingAmount: totalPending,
      paidAmount: totalPaid,
      pendingInvoices: pendingInvoices.length,
    },
  };
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { projects, invoices, stats } = await getDashboardData(session.user.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Client Portal
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Welcome back, {session.user.name || "Client"}!
              </p>
            </div>
            <Link href="/contact">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer">
                Request a Website or App
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <div className="rounded-lg border border-border bg-card p-3 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Active Projects
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                  {stats.activeProjects}
                </h3>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                  {stats.completedProjects}
                </h3>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-500" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Pending Invoices
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                  {stats.pendingInvoices}
                </h3>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-500" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Total Paid
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                  ${stats.paidAmount.toLocaleString()}
                </h3>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Recent Projects */}
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold">
                Recent Projects
              </h2>
              <Link href="/dashboard/projects">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="p-4 sm:p-6">
              {projects.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Briefcase className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    No projects yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/dashboard/projects/${project.id}`}
                      className="block rounded-lg border border-border p-3 sm:p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium mb-1 text-sm sm:text-base truncate">
                            {project.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                            {project.description || "No description"}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ${
                            project.status === "Live"
                              ? "bg-green-500/10 text-green-600 dark:text-green-500"
                              : project.status === "Development"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-500"
                              : project.status === "Design"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-500"
                              : "bg-orange-500/10 text-orange-600 dark:text-orange-500"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-3 flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          <span className="text-xs">{project.progress}%</span>
                        </div>
                        {project.budget && (
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            {project.budget.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold">
                Recent Invoices
              </h2>
              <Link href="/dashboard/invoices">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="p-6">
              {invoices.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground mt-2">
                    No invoices yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <Link
                      key={invoice.id}
                      href={`/dashboard/invoices/${invoice.id}`}
                      className="block rounded-lg border border-border p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium mb-0.5">
                            {invoice.invoiceNumber}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {invoice.project.name}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            invoice.status === "Paid"
                              ? "bg-green-500/10 text-green-600 dark:text-green-500"
                              : invoice.status === "Overdue"
                              ? "bg-red-500/10 text-red-600 dark:text-red-500"
                              : "bg-orange-500/10 text-orange-600 dark:text-orange-500"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">
                          ${invoice.amount.toLocaleString()}
                        </span>
                        {invoice.dueDate && (
                          <span className="text-muted-foreground">
                            Due{" "}
                            {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/projects">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">View Projects</div>
                  <div className="text-xs text-muted-foreground">
                    Track project progress
                  </div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/invoices">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
              >
                <FileText className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">View Invoices</div>
                  <div className="text-xs text-muted-foreground">
                    Manage payments
                  </div>
                </div>
              </Button>
            </Link>
            <Link href="/#contact">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Request New Project</div>
                  <div className="text-xs text-muted-foreground">
                    Contact us for a quote
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
