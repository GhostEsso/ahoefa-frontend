"use client";

import { useEffect, useState } from "react";
import { PropertyCard } from "@/components/property-card";
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

export function PropertiesSection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [listingTypeFilter, setListingTypeFilter] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProperties();
  }, []);

  useEffect(() => {
    if (mounted) {
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
  }, [properties, searchTerm, typeFilter, listingTypeFilter, mounted]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/public`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const sortedProperties = data.sort((a: Property, b: Property) => {
        if (a.user.isPremium && !b.user.isPremium) return -1;
        if (!a.user.isPremium && b.user.isPremium) return 1;
        return 0;
      });

      setProperties(sortedProperties);
    } catch (error) {
      console.error("Erreur lors du chargement des propriétés:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Propriétés en vedette
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="h-[400px] rounded-lg bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property: Property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            {filteredProperties.length < properties.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Voir plus de propriétés
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
} 

function setPage(arg0: (prev: any) => any) {
    throw new Error("Function not implemented.");
}
