"use client";

import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    // Si l'utilisateur est authentifié, rediriger vers /properties
    if (status === 'authenticated') {
      router.push('/properties');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-500">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
} 