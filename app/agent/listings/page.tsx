"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AgentListingsPage() {
  const { data: session } = useSession();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAgentListings();
  }, [session]);

  const fetchAgentListings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/agent/listings`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });
      
      if (!response.ok) throw new Error("Erreur lors du chargement");
      
      const data = await response.json();
      setListings(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des annonces");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Annonces</h1>
        <Link href="/properties/create">
          <Button>Créer une annonce</Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Vous n&apos;avez pas encore créé d&apos;annonces
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} property={listing} showActions />
          ))}
        </div>
      )}
    </div>
  );
} 