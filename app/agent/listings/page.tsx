"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PropertyCard } from '@/components/property-card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  listingType: string;
  location: string;
  images: string[];
  available: boolean;
  user: {
    firstName: string;
    lastName: string;
    isPremium: boolean;
  };
}

export default function AgentListingsPage() {
  const { data: session } = useSession();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/agent/listings`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`
        }
      });
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      toast.error("Erreur lors du chargement des annonces");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchListings();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      if (!response.ok) throw new Error();

      toast.success("Annonce supprimée avec succès");
      fetchListings();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ available: !currentStatus })
      });

      if (!response.ok) throw new Error();

      toast.success("Statut mis à jour avec succès");
      fetchListings();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mes Annonces</h1>
        <Link href="/properties/create">
          <Button>Créer une annonce</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="relative">
            <PropertyCard property={listing} />
            <div className="absolute top-2 right-2 space-x-2">
              <Link href={`/properties/edit/${listing.id}`}>
                <Button size="sm" variant="outline">Modifier</Button>
              </Link>
              <Button 
                size="sm" 
                variant={listing.available ? "default" : "secondary"}
                onClick={() => toggleAvailability(listing.id, listing.available)}
              >
                {listing.available ? "Désactiver" : "Activer"}
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleDelete(listing.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Vous n&apos;avez pas encore créé d&apos;annonces
        </div>
      )}
    </div>
  );
} 