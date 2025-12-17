"use client";

import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: (notification: any) => void) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
        };
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

    const initializeGoogleOneTap = () => {
      if (!window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) return;

      hasInitialized.current = true;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            // Sign in with Google using Better Auth
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            });
            router.push("/dashboard");
          } catch (error) {
            console.error("Google One Tap sign-in failed:", error);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        // Enable FedCM for future-proofing (Chrome 117+)
        use_fedcm_for_prompt: true,
      });

      // Show the One Tap prompt
      // No callback - FedCM handles all UI status internally for privacy
      window.google.accounts.id.prompt();
    };

    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleOneTap;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [router]);

  return null;
}
