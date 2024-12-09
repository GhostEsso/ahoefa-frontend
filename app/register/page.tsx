"use client";

import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm mode="register" plan={plan} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-500">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
} 