"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Client Portal</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user?.name || "Client"}!
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Active Projects</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">
              No active projects yet
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Pending Invoices</h3>
            <p className="text-3xl font-bold">$0</p>
            <p className="text-sm text-muted-foreground">All invoices paid</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Support Tickets</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">No open tickets</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Your Projects</h2>
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">You don&apos;t have any projects yet.</p>
            <Link href="/#contact">
              <Button>Start a New Project</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
