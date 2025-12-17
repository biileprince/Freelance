"use client";

import { AdminUser } from "@/lib/admin";
import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { LogOut, Bell } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  admin: AdminUser;
}

export function AdminHeader({ admin }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
      {/* Spacer for mobile menu button */}
      <div className="w-10 lg:hidden" />

      {/* Page Title - could be dynamic */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
        </Button>

        <ThemeToggle />

        {/* User Info */}
        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium">{admin.name || "Admin"}</p>
            <p className="text-xs text-muted-foreground">{admin.email}</p>
          </div>
          {admin.image ? (
            <img
              src={admin.image}
              alt={admin.name || "Admin"}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-medium">
                {admin.name?.charAt(0) || admin.email.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
