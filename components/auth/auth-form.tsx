"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

interface AuthFormProps {
  mode: "login" | "register";
  plan?: string | null;
}

export function AuthForm({ mode, plan }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    organization: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (mode === "login") {
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        toast.success('Connexion réussie');
        router.push('/properties');
      } else {
        // Déterminer le rôle en fonction du plan
        const role = plan === 'premium' ? 'AGENT_PREMIUM' : 
                    plan === 'standard' ? 'AGENT' : 
                    'USER';

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            role,
            agentStatus: role.includes('AGENT') ? 'PENDING' : undefined,
            isPremium: role === 'AGENT_PREMIUM'
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur lors de l'inscription");
        }

        toast.success("Compte créé avec succès");
        router.push("/login");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { 
      callbackUrl: "/properties"
    });
  };

  // Déterminer le rôle et le label selon le plan
  const getRoleInfo = () => {
    switch (plan) {
      case 'basic':
        return { role: 'AGENT', label: 'Agent' };
      case 'standard':
        return { role: 'AGENT', label: 'Agent Standard' };
      case 'premium':
        return { role: 'AGENT_PREMIUM', label: 'Agent Premium' };
      default:
        return { role: 'USER', label: 'Utilisateur' };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          {mode === "login" ? "Connexion" : "Créer un compte"}
        </h2>
        <p className="mt-2 text-gray-600">
          {mode === "login"
            ? "Connectez-vous pour accéder à votre compte"
            : "Inscrivez-vous pour commencer"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {mode === "register" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">
                  Prénom
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Nom
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium">
                Numéro de téléphone
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {plan && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Type de compte</label>
                  <Input
                    type="text"
                    value={roleInfo.label}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium mb-2">
                    Organisation
                  </label>
                  <Input
                    id="organization"
                    name="organization"
                    type="text"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Nom de votre agence immobilière"
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Mot de passe
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            "Chargement..."
          ) : mode === "login" ? (
            "Se connecter"
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Continuer avec Google
      </Button>
    </div>
  );
} 