"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

// Import from our client-side auth utilities
import { signInWithGoogle } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Main login component that uses useSearchParams
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for error parameters in the URL
  useEffect(() => {
    const errorType = searchParams?.get("error");
    console.log("URL error parameter:", errorType);
    
    // Also log all search params for debugging
    console.log("All search params:", Object.fromEntries([...searchParams?.entries() || []]));
    
    if (errorType) {
      switch (errorType) {
        case "Configuration":
          setError("There is a server configuration issue. Please contact the administrator.");
          console.error("NextAuth Configuration error: Missing environment variables in production");
          break;
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
        case "EmailCreateAccount":
        case "Callback":
          setError("There was a problem with the authentication service. Please try again.");
          break;
        case "OAuthAccountNotLinked":
          setError("This email is already associated with another account.");
          break;
        case "EmailSignin":
          setError("The email could not be sent.");
          break;
        case "CredentialsSignin":
          setError("The credentials you provided are invalid.");
          break;
        default:
          setError("An unknown error occurred. Please try again.");
          break;
      }
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting Google sign-in process...");
      // Use our helper function from auth-client.ts
      await signInWithGoogle("/");
      console.log("Sign-in function called successfully");
      // Note: With redirect: true, the code below may not execute as the page will redirect
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="text-2xl font-bold">SportSpot</div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to book arenas and classes
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <div className="text-red-500">{error}</div>
          )}
          <Button
            className="w-full"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-current mr-2"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  src="https://authjs.dev/img/providers/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>Sign in with Google</span>
              </div>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// Wrapper component with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
