"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// Global flag to prevent multiple concurrent One Tap requests
let isOneTapPending = false;

export function GoogleOneTap() {
  const hasInitialized = useRef(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Don't show One Tap if user is already logged in or still loading
    if (isPending || session?.user) return;

    // Prevent multiple concurrent requests
    if (hasInitialized.current || isOneTapPending) return;

    // Only run on client side
    if (typeof window === "undefined") return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.log("Google One Tap: Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
      return;
    }

    // Mark as initialized and pending
    hasInitialized.current = true;
    isOneTapPending = true;

    // Use Better Auth's built-in oneTap method
    const initOneTap = async () => {
      try {
        await authClient.oneTap({
          callbackURL: "/dashboard", // Where to redirect after successful login
          fetchOptions: {
            onSuccess: (context) => {
              // The user's email is in context.data.user.email
              const userEmail = context?.data?.user?.email;
              console.log("Google One Tap sign-in successful", {
                email: userEmail,
              });

              // Reset flags before navigation
              isOneTapPending = false;

              // Use soft navigation instead of hard reload
              router.push("/dashboard");
              router.refresh();
            },
            onError: (context) => {
              console.error("Google One Tap sign-in failed:", context.error);
              // Reset flags so user can try again
              hasInitialized.current = false;
              isOneTapPending = false;
            },
          },
          // Handle when user dismisses the prompt
          onPromptNotification: (notification) => {
            console.warn("One Tap prompt dismissed or skipped:", notification);

            // Reset flags when prompt lifecycle ends
            if (
              notification.isNotDisplayed() ||
              notification.isSkippedMoment() ||
              notification.isDismissedMoment()
            ) {
              console.log("One Tap prompt lifecycle ended");
              hasInitialized.current = false;
              isOneTapPending = false;
            }
          },
        });
      } catch (error) {
        console.error("Failed to initialize Google One Tap:", error);
        // Reset flags on error
        hasInitialized.current = false;
        isOneTapPending = false;
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initOneTap, 500);

    return () => {
      clearTimeout(timer);
      // Clean up if component unmounts during pending request
      if (isOneTapPending) {
        isOneTapPending = false;
      }
    };
  }, [session, isPending, router]);

  return null;
}
