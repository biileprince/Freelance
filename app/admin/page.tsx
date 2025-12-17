import { getDashboardStats } from "@/lib/admin";
import {
  Users,
  FolderKanban,
  FileText,
  MessageSquare,
  DollarSign,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      href: "/admin/clients",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "New Messages",
      value: stats.newContacts,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Pending Invoices",
      value: stats.pendingInvoices,
      icon: FileText,
      href: "/admin/invoices",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      href: "/admin/invoices",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Pending Revenue",
      value: `$${stats.pendingRevenue.toLocaleString()}`,
      icon: Clock,
      href: "/admin/invoices",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2.5 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="rounded-xl border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border p-4 sm:p-6">
            <h2 className="font-semibold">Recent Messages</h2>
            <Link
              href="/admin/contacts"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {stats.recentContacts.length > 0 ? (
              stats.recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start gap-4 p-4 sm:p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-sm font-medium">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.status === "New" && (
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.projectType}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No messages yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="rounded-xl border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border p-4 sm:p-6">
            <h2 className="font-semibold">Recent Projects</h2>
            <Link
              href="/admin/projects"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {stats.recentProjects.length > 0 ? (
              stats.recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 sm:p-6"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">{project.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {project.user?.name || project.user?.email || "No client"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">{project.progress}%</p>
                      <p className="text-xs text-muted-foreground">
                        {project.status}
                      </p>
                    </div>
                    <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No projects yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border bg-background p-4 sm:p-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <FolderKanban className="h-4 w-4" />
            New Project
          </Link>
          <Link
            href="/admin/invoices/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Create Invoice
          </Link>
          <Link
            href="/admin/contacts"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            View Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
