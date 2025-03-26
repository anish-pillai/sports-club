import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/db";

// IMPORTANT: This file should only be imported in server components or API routes
// For client components, use next-auth/react instead

// Define custom User type with role
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: string;
    }
  }
}

// Ensure required environment variables are present
const checkEnvVars = () => {
  const requiredVars = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];
  
  for (const envVar of requiredVars) {
    if (!process.env[envVar]) {
      console.error(`Missing environment variable: ${envVar}`);
    }
  }
};

// Only run in server context
if (typeof window === 'undefined') {
  checkEnvVars();
}

// Create a safe adapter that only runs on the server
const getSafeAdapter = () => {
  // Only use PrismaAdapter on the server
  if (typeof window === 'undefined') {
    return PrismaAdapter(prisma);
  }
  // Return null for client-side rendering
  return undefined;
};

// Export only the handlers and auth function for server-side usage
// Do NOT export signIn and signOut here - they should be imported from next-auth/react in client components
export const { handlers, auth } = NextAuth({
  adapter: getSafeAdapter(),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string || token.sub as string;
        session.user.name = token.name || "";
        session.user.email = token.email || "";
        session.user.image = token.picture as string | null;
        session.user.role = token.role as string || "USER";
      }
      return session;
    },
    async jwt({ token, user }) {
      try {
        // Only query database when needed
        if (user) {
          token.id = user.id;
          token.role = user.role || "USER";
          return token;
        }
        
        // Only look up the user if we don't have the role yet and we're on the server
        if (!token.role && typeof window === 'undefined') {
          try {
            const dbUser = await prisma.user.findFirst({
              where: {
                email: token.email,
              },
            });

            if (dbUser) {
              token.id = dbUser.id;
              token.name = dbUser.name;
              token.email = dbUser.email;
              token.picture = dbUser.image;
              token.role = dbUser.role || "USER";
            } else {
              // Set default role if user not found
              token.role = "USER";
            }
          } catch (dbError) {
            console.error("Database lookup error:", dbError);
            // Set default role if database lookup fails
            token.role = "USER";
          }
        } else if (!token.role) {
          // Set default role for client-side
          token.role = "USER";
        }
        
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        // Ensure token has a role even if there's an error
        if (!token.role) token.role = "USER";
        return token;
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});
