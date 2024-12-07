"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, MapPin, Phone, Mail } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NoSSR } from '@/components/no-ssr';

interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  organization: string;
  isPremium: boolean;
  listings: { id: string }[];
}

export function AgentsList() {
  return (
    <NoSSR>
      <AgentsListContent />
    </NoSSR>
  );
}

function AgentsListContent() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agents/public`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des agents');
      }
      const data = await response.json();
      setAgents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur lors du chargement des agents:", error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      setAgents([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents && agents.length > 0 ? (
        agents.map((agent) => (
          <Card key={agent.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {agent.firstName} {agent.lastName}
                  </h3>
                  {agent.isPremium && (
                    <Badge variant="warning" className="mt-1">
                      Agent Premium
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {agent.organization && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{agent.organization}</span>
                  </div>
                )}
                {agent.isPremium && (
                  <>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{agent.phoneNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{agent.email}</span>
                    </div>
                  </>
                )}
                <div className="text-sm text-gray-500">
                  {agent.listings.length} annonce(s)
                </div>
              </div>

              <div className="mt-6">
                <Link href={`/agents/${agent.id}`}>
                  <Button className="w-full">
                    Voir les annonces
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-12 text-gray-500 col-span-full">
          Aucun agent disponible pour le moment
        </div>
      )}
    </div>
  );
} 