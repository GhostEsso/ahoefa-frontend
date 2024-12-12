"use client";

import { useEffect, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/public?page=home`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des propriétés');
      }
      
      const data = await response.json();
      setProperties(data.listings);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Propriétés en vedette
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection des meilleures propriétés
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {properties.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Aucune propriété disponible pour le moment
              </div>
            ) : (
              <div className="text-center mt-12">
                <Link href="/properties">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Voir toutes les propriétés
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
