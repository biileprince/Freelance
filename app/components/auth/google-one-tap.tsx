"use client";

import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
  clientId?: string;
}

interface GooglePromptNotification {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getNotDisplayedReason: () => string;
  getSkippedReason: () => string;
  getDismissedReason: () => string;
}

interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    use_fedcm_for_prompt?: boolean;
    itp_support?: boolean;
  }) => void;
  prompt: (callback?: (notification: GooglePromptNotification) => void) => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
  cancel: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}

export function GoogleOneTap() {
  const router = useRouter();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run on client side and once
    if (typeof window === "undefined" || hasInitialized.current) return;

    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          // User already logged in, don't show One Tap
          return true;
        }
      } catch {
        // Not logged in, continue with One Tap
      }
      return false;
    };

    const initializeGoogleOneTap = async () => {
      const isLoggedIn = await checkSession();
      if (isLoggedIn) return;

      if (!window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.log("Google One Tap: Missing google library or client ID");
        return;
      }

      hasInitialized.current = true;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: GoogleCredentialResponse) => {
          if (!response.credential) {
            console.error("No credential received from Google");
            return;
          }

          try {
            // Use the ID token to sign in with Better Auth's Google provider
            // Better Auth handles the OAuth flow on the backend
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            });
          } catch (error) {
            console.error("Google One Tap sign-in failed:", error);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        itp_support: true, // Enable Intelligent Tracking Prevention support for Safari
      });

      // Show the One Tap prompt with debugging
      window.google.accounts.id.prompt(
        (notification: GooglePromptNotification) => {
          if (notification.isNotDisplayed()) {
            console.log(
              "Google One Tap not displayed:",
              notification.getNotDisplayedReason()
            );
          } else if (notification.isSkippedMoment()) {
            console.log(
              "Google One Tap skipped:",
              notification.getSkippedReason()
            );
          } else if (notification.isDismissedMoment()) {
            console.log(
              "Google One Tap dismissed:",
              notification.getDismissedReason()
            );
          }
        }
      );
    };

    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleOneTap;
    script.onerror = () => {
      console.error("Failed to load Google Identity Services");
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Cancel any pending prompts
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
    };
  }, [router]);

  return null;
}
