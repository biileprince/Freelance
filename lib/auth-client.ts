import { createAuthClient } from "better-auth/react";
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      autoSelect: true, // Auto-select account if user is already signed in to Google
      cancelOnTapOutside: true, // Close popup when clicking outside
      context: "signin", // Context: "signin", "signup", or "use"
      // Exponential backoff configuration for prompt retries
      promptOptions: {
        baseDelay: 3000, // Start with 3 second delay (recommended by Google)
        maxAttempts: 5, // Try up to 5 times before giving up
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
