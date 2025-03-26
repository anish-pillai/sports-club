import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/db";

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
        
        // Only look up the user if we don't have the role yet
        if (!token.role) {
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
            token.role = dbUser.role;
          }
        }
        
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});
