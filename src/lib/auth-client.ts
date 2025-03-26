"use client";

/**
 * This file provides client-side authentication utilities
 * Import from this file in client components instead of from auth.ts
 */

import { 
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession
} from "next-auth/react";

// Re-export client-side auth functions with proper typing
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
export { useSession };

// Helper function to handle Google sign-in with error handling
export const signInWithGoogle = async (callbackUrl = "/") => {
  try {
    console.log("Auth client: Starting Google sign-in with callbackUrl:", callbackUrl);
    
    // Use the client-side signIn function with proper configuration
    const result = await nextAuthSignIn("google", {
      callbackUrl,
      redirect: true
    });
    
    console.log("Auth client: Sign-in result:", result);
    return result;
  } catch (error) {
    console.error("Auth client: Google sign-in failed:", error);
    // Rethrow the error so it can be caught by the component
    throw error;
  }
};

// Helper function to handle sign-out with error handling
export const handleSignOut = async (callbackUrl = "/login") => {
  try {
    return await nextAuthSignOut({
      callbackUrl,
      redirect: true
    });
  } catch (error) {
    console.error("Sign-out failed:", error);
    throw error;
  }
};
