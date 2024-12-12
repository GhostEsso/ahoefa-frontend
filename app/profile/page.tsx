"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { User, Mail, Phone, Building } from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  organization?: string;
  role: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Erreur chargement profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!profile) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <Link href="/profile/edit">
            <Button>Modifier le profil</Button>
          </Link>
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <Badge variant={profile.role === 'AGENT_PREMIUM' ? 'warning' : 'default'}>
                  {profile.role === 'AGENT_PREMIUM' ? 'Agent Premium' : 
                   profile.role === 'AGENT' ? 'Agent' : 'Utilisateur'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{profile.email}</span>
            </div>

            {profile.phoneNumber && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>{profile.phoneNumber}</span>
              </div>
            )}

            {profile.organization && (
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-500" />
                <span>{profile.organization}</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
} 