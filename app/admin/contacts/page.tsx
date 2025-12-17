import prisma from "@/lib/prisma";
import { ContactsTable } from "./contacts-table";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    total: contacts.length,
    new: contacts.filter((c) => c.status === "New").length,
    read: contacts.filter((c) => c.status === "Read").length,
    replied: contacts.filter((c) => c.status === "Replied").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Contact Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage messages from your contact form
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Messages</p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-2xl font-bold text-green-500">{stats.new}</p>
          <p className="text-sm text-muted-foreground">New</p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-2xl font-bold text-blue-500">{stats.read}</p>
          <p className="text-sm text-muted-foreground">Read</p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-2xl font-bold text-purple-500">{stats.replied}</p>
          <p className="text-sm text-muted-foreground">Replied</p>
        </div>
      </div>

      {/* Contacts Table */}
      <ContactsTable contacts={contacts} />
    </div>
  );
}
