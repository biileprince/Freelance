"use client";

import { useEffect, useRef } from "react";
import { oneTap, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function GoogleOneTap() {
  const router = useRouter();
  const hasInitialized = useRef(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Don't show One Tap if user is already logged in
    if (session?.user || hasInitialized.current) return;

    // Only run on client side
    if (typeof window === "undefined") return;

    const initializeOneTap = async () => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.log("Google One Tap: Missing client ID");
        return;
      }

      hasInitialized.current = true;

      try {
        // Use Better Auth's oneTap client method
        // This handles all the Google One Tap initialization and callbacks
        await oneTap({
          fetchOptions: {
            onSuccess: () => {
              console.log("Google One Tap sign-in successful");
              // Redirect to dashboard after successful sign-in
              router.push("/dashboard");
              router.refresh();
            },
            onError: (error) => {
              console.error("Google One Tap sign-in failed:", error);
            },
          },
        });
      } catch (error) {
        console.error("Failed to initialize Google One Tap:", error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeOneTap, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [session, router]);

  return null;
}
