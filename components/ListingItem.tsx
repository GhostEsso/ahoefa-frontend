"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from "./ui/button";

interface ListingItemProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
    userId: string;
    // ... autres propriétés
  };
}

export function ListingItem({ listing }: ListingItemProps) {
  const router = useRouter();
  const { data: session } = useSession();

  // Débogage
  console.log("Session:", session);
  console.log("Listing:", listing);
  console.log("User ID from session:", session?.user?.id);
  console.log("User ID from listing:", listing.userId);

  const isOwner = session?.user?.id === listing.userId;

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/listings/${listing.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Annonce supprimée avec succès');
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Erreur lors de la suppression');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'annonce');
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{listing.title}</h3>
      <p className="text-gray-600">{listing.description}</p>
      <p className="text-lg font-bold mt-2">{listing.price} FCFA</p>
      
      {isOwner && (
        <div className="mt-4">
          <Button 
            onClick={handleDelete}
            variant="destructive"
            className="w-full"
          >
            Supprimer l&apos;annonce
          </Button>
        </div>
      )}
    </div>
  );
} 