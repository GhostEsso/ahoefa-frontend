"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { NoSSR } from '@/components/no-ssr';

interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  organization: string;
  isPremium: boolean;
  listings: any[];
}

export default function AgentDetailsPage() {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgentDetails();
  }, [id]);

  const fetchAgentDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agents/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des détails de l'agent");
      }
      const data = await response.json();
      setAgent(data);
    } catch (error) {
      console.error("Erreur:", error);
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !agent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error || "Agent non trouvé"}
        </div>
      </div>
    );
  }

  return (
    <NoSSR>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {agent.firstName} {agent.lastName}
              </h1>
              {agent.isPremium && (
                <Badge variant="warning" className="mt-1">
                  Agent Premium
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {agent.organization && (
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{agent.organization}</span>
              </div>
            )}
            {agent.isPremium && (
              <>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{agent.phoneNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{agent.email}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Annonces de l'agent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agent.listings && agent.listings.length > 0 ? (
            agent.listings.map((listing) => (
              <PropertyCard key={listing.id} property={listing} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucune annonce disponible
            </div>
          )}
        </div>
      </div>
    </NoSSR>
  );
} 