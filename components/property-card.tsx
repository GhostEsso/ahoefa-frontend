"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, BedDouble, Bath, Square } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export interface Feature {
  name: string;
  value: string;
}

export interface Property {
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

interface PropertyCardProps {
  property: Property;
}

const fallbackImage = '/images/property-placeholder.jpg';

export function PropertyCard({ property }: PropertyCardProps) {
  const [imgSrc, setImgSrc] = useState(property.images[0] || fallbackImage);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleViewDetails = () => {
    if (!isAuthenticated) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col`}>
          <div className="p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Connectez-vous pour voir les détails
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Créez un compte ou connectez-vous pour accéder aux détails de cette propriété
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-t border-gray-200">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                router.push('/login');
              }}
              className="flex-1 px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Se connecter
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                router.push('/register');
              }}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-500 border-l border-gray-200 focus:outline-none"
            >
              Créer un compte
            </button>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-center',
      });
    } else {
      router.push(`/properties/${property.id}`);
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className={`relative ${property.user.isPremium ? 'border-2 border-yellow-400' : ''}`}>
        <div className="relative h-48 cursor-pointer" onClick={handleViewDetails}>
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          <Image
            src={imgSrc}
            alt={property.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={() => setImgSrc(fallbackImage)}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            {property.user.isPremium && (
              <Badge variant="warning">
                Premium
              </Badge>
            )}
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant={property.listingType === 'RENT' ? 'secondary' : 'default'}>
              {property.listingType === 'RENT' ? 'À Louer' : 'À Vendre'}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            {property.features.some(f => f.name === 'chambres') && (
              <div className="flex items-center gap-1">
                <BedDouble className="w-4 h-4" />
                <span>{property.features.find(f => f.name === 'chambres')?.value} Ch.</span>
              </div>
            )}
            {property.features.some(f => f.name === 'sdb') && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.features.find(f => f.name === 'sdb')?.value} SDB</span>
              </div>
            )}
            {property.features.some(f => f.name === 'surface') && (
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{property.features.find(f => f.name === 'surface')?.value}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-1">
              <div className="text-xl font-bold text-blue-600">
                {property.price.toLocaleString()} FCFA
                {property.listingType === 'RENT' && (
                  <span className="text-sm text-gray-500 ml-1">/mois</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Par {property.user.firstName} {property.user.lastName}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewDetails}
            >
              Voir détails
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
} 