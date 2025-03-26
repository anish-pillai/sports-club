"use client";

import { AuthProvider } from "./auth-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-center" />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
