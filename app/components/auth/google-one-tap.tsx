"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function GoogleOneTap() {
  const hasInitialized = useRef(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Don't show One Tap if user is already logged in or still loading
    if (isPending || session?.user || hasInitialized.current) return;

    // Only run on client side
    if (typeof window === "undefined") return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.log("Google One Tap: Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
      return;
    }

    hasInitialized.current = true;

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

              // Use soft navigation instead of hard reload
              router.push("/dashboard");
              router.refresh();
            },
            onError: (context) => {
              console.error("Google One Tap sign-in failed:", context.error);
              // Reset the flag so user can try again
              hasInitialized.current = false;
            },
          },
          // Handle when user dismisses the prompt
          onPromptNotification: (notification) => {
            console.warn("One Tap prompt dismissed or skipped:", notification);

            // After max attempts, you could show alternative sign-in button
            if (
              notification.isNotDisplayed() ||
              notification.isSkippedMoment()
            ) {
              console.log("Consider showing alternative Google Sign-In button");
              hasInitialized.current = false;
            }
          },
        });
      } catch (error) {
        console.error("Failed to initialize Google One Tap:", error);
        hasInitialized.current = false;
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initOneTap, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [session, isPending, router]);

  return null;
}
