"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  listingType: string;
  images: string[];
  available: boolean;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setListings(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des publications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailabilityToggle = async (listingId: string, available: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${listingId}/availability`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ available }),
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Statut de publication mis à jour");
      fetchListings();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const handleDelete = async (listingId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Publication supprimée avec succès");
      fetchListings();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestion des Publications</h1>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0">
                        {listing.title}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{listing.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="relative h-64 rounded-lg overflow-hidden">
                            {listing.images[0] && (
                              <Image
                                src={listing.images[0]}
                                alt={listing.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {listing.images.slice(1, 4).map((image, index) => (
                              <div
                                key={index}
                                className="relative h-20 rounded-lg overflow-hidden"
                              >
                                <Image
                                  src={image}
                                  alt={`${listing.title} ${index + 2}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold">Prix</h3>
                            <p>{listing.price.toLocaleString()} FCFA</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Localisation</h3>
                            <p>{listing.location}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Type</h3>
                            <p>{listing.type} - {listing.listingType}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Agent</h3>
                            <p>{listing.user.firstName} {listing.user.lastName}</p>
                            <p className="text-sm text-gray-500">{listing.user.email}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {listing.user.firstName} {listing.user.lastName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {listing.type} - {listing.listingType}
                  </Badge>
                </TableCell>
                <TableCell>{listing.price.toLocaleString()} FCFA</TableCell>
                <TableCell>
                  <Badge
                    variant={listing.available ? "success" : "destructive"}
                  >
                    {listing.available ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(listing.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={listing.available ? "destructive" : "outline"}
                      onClick={() =>
                        handleAvailabilityToggle(listing.id, !listing.available)
                      }
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 