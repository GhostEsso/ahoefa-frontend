"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 