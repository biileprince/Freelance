import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  Activity,
  Tag,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { headers } from "next/headers";

async function getProject(projectId: string, userId: string) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    include: {
      invoices: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return project;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const project = await getProject(id, session.user.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm" className="mb-3 sm:mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-sm">Back to Projects</span>
            </Button>
          </Link>

          {/* Project Cover Image */}
          {project.imageUrl && (
            <div className="mb-4 sm:mb-6 aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 sm:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {project.name}
              </h1>
              {project.description && (
                <p className="text-muted-foreground text-sm sm:text-base">
                  {project.description}
                </p>
              )}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0 self-start ${
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
        </div>

        {/* Project Details Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-6 sm:mb-8">
          {/* Progress Card */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <h2 className="font-semibold text-sm sm:text-base">
                Project Progress
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold">{project.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 sm:h-3">
                <div
                  className="bg-emerald-600 h-2 sm:h-3 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Budget Card */}
          {project.budget && (
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <h2 className="font-semibold text-sm sm:text-base">Budget</h2>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">
                ${project.budget.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Project budget
              </p>
            </div>
          )}

          {/* Timeline Card */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <h2 className="font-semibold text-sm sm:text-base">Timeline</h2>
            </div>
            <div className="space-y-2">
              {project.startDate && (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">
                    {format(new Date(project.startDate), "MMM d, yyyy")}
                  </span>
                </div>
              )}
              {project.endDate && (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">
                    {format(new Date(project.endDate), "MMM d, yyyy")}
                  </span>
                </div>
              )}
              {!project.startDate && !project.endDate && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  No timeline set yet
                </p>
              )}
            </div>
          </div>

          {/* Details Card */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <h2 className="font-semibold text-sm sm:text-base">Details</h2>
            </div>
            <div className="space-y-2">
              {project.category && (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{project.category}</span>
                </div>
              )}
              {project.technologies && (
                <div className="text-xs sm:text-sm">
                  <span className="text-muted-foreground block mb-1">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.split(",").map((tech) => (
                      <span
                        key={tech.trim()}
                        className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live URL */}
        {project.liveUrl && (
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold mb-1">Live Website</h2>
                <p className="text-sm text-muted-foreground">
                  Your project is live and accessible
                </p>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Visit Site
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Invoices */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="font-semibold">Project Invoices</h2>
            {project.invoices.length > 0 && (
              <Link href="/dashboard/invoices">
                <Button variant="ghost" size="sm">
                  View All Invoices
                </Button>
              </Link>
            )}
          </div>
          <div className="p-6">
            {project.invoices.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground mt-2">
                  No invoices for this project yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {project.invoices.map((invoice) => (
                  <Link
                    key={invoice.id}
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="block rounded-lg border border-border p-4 hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">
                            {invoice.invoiceNumber}
                          </h3>
                          {invoice.description && (
                            <p className="text-sm text-muted-foreground">
                              {invoice.description}
                            </p>
                          )}
                        </div>
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
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          Due {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
