"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Property } from "@/components/property-card";

interface Feature {
  id: string;
  name: string;
  value: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  listingType: string;
  location: string;
  address: string;
  images: string[];
  userId: string;
  features: Feature[];
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    isPremium: boolean;
    firstName: string;
    lastName: string;
  };
}

export default function MyListingsPage() {
  const { data: session } = useSession();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyListings = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/my-listings`, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Erreur lors du chargement des annonces:', error);
      toast.error("Erreur lors du chargement des annonces");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchMyListings();
  }, [fetchMyListings]);

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
      fetchMyListings();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error("Erreur lors de la suppression");
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing: Listing) => (
          <div key={listing.id} className="relative">
            <PropertyCard property={listing as Property} />
            <div className="absolute top-2 right-2 space-x-2">
              <Link href={`/properties/edit/${listing.id}`}>
                <Button size="sm" variant="outline">Modifier</Button>
              </Link>
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