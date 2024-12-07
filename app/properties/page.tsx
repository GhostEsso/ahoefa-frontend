"use client";

import { useAuth } from "@/hooks/useAuth";
import { PropertiesClient } from "@/components/properties-client";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function PropertiesPage() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null; // Le middleware redirigera
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Toutes les propriétés</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <PropertiesClient />
        </Suspense>
      </div>
    </div>
  );
} 