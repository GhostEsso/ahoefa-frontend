"use client";

import React, { useEffect, useState, useCallback } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from 'next/dynamic';
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  listingType: string;
  location: string;
  images: string[];
  features: string[];
  user: {
    isPremium: boolean;
    firstName: string;
    lastName: string;
  };
}

export function PropertiesClientComponent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [listingTypeFilter, setListingTypeFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 12;

  const fetchProperties = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/public?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProperties(data.listings);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      setFilteredProperties(data.listings);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, ITEMS_PER_PAGE]);

  useEffect(() => {
    setIsClient(true);
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    if (properties.length > 0) {
      const filtered = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            property.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = typeFilter === 'all' || property.type === typeFilter;
        const matchesListingType = listingTypeFilter === 'all' || property.listingType === listingTypeFilter;

        return matchesSearch && matchesType && matchesListingType;
      });
      setFilteredProperties(filtered);
    }
  }, [properties, searchTerm, typeFilter, listingTypeFilter]);

  if (!isClient) {
    return <div className="h-screen bg-gray-50" />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une propriété..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Type de propriété" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="HOUSE">Maison</SelectItem>
            <SelectItem value="APARTMENT">Appartement</SelectItem>
            <SelectItem value="OFFICE">Bureau</SelectItem>
            <SelectItem value="LAND">Terrain</SelectItem>
          </SelectContent>
        </Select>

        <Select value={listingTypeFilter} onValueChange={setListingTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Type d'annonce" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les annonces</SelectItem>
            <SelectItem value="RENT">Location</SelectItem>
            <SelectItem value="SALE">Vente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {!isLoading && filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">
            Aucune propriété trouvée
          </h3>
          <p className="mt-2 text-gray-500">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}

      <div className="flex justify-center gap-2 mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        
        <span className="flex items-center px-4">
          Page {currentPage} sur {totalPages}
        </span>
        
        <Button
          variant="outline"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}

// Export avec dynamic pour désactiver le SSR
export const PropertiesClient = dynamic(
  () => Promise.resolve(PropertiesClientComponent),
  { ssr: false }
); 