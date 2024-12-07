"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, User, MessageCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/hooks/useAuth";
import { ChatModal } from "@/components/chat/chat-modal";
import { toast } from "react-hot-toast";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  listingType: string;
  location: string;
  address: string;
  images: string[];
  features: string[];
  available: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isPremium: boolean;
  };
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/${id}`);
      if (!response.ok) throw new Error("Erreur lors du chargement des détails");
      const data = await response.json();
      
      console.log("Property data:", data);
      
      setProperty({
        ...data,
        user: {
          ...data.user,
          isPremium: data.user.isPremium || false
        }
      });
      
      if (data.images.length > 0) {
        setSelectedImage(data.images[0]);
      }
    } catch (error) {
      toast.error("Erreur lors du chargement des détails");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Propriété non trouvée</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galerie d'images */}
        <div className="space-y-4">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={selectedImage || property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {property.images.map((image, index) => (
              <div
                key={index}
                className={`relative h-20 cursor-pointer rounded-lg overflow-hidden ${
                  selectedImage === image ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Informations de la propriété */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant={property.listingType === "RENT" ? "secondary" : "default"}>
                {property.listingType === "RENT" ? "À Louer" : "À Vendre"}
              </Badge>
              {property.user.isPremium && (
                <Badge variant="warning">Agent Premium</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.location}</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {property.price.toLocaleString()} FCFA
              {property.listingType === "RENT" && (
                <span className="text-sm text-gray-500 ml-1">/mois</span>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Informations de l'agent */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Agent immobilier</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">
                    {property.user.firstName} {property.user.lastName}
                  </p>
                  {property.user.isPremium && (
                    <Badge variant="warning" className="mt-1">
                      Agent Premium
                    </Badge>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {property.user.isPremium ? (
                  <>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>{property.user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{property.user.phoneNumber}</span>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => setIsChatModalOpen(true)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contacter l'agent
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 mb-4">
                      Cet agent n'est pas premium. Contactez l'administrateur pour plus d'informations.
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => window.location.href = `mailto:${process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contacter l'administrateur
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de chat */}
      {property.user.isPremium && (
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          agentId={property.user.id}
          propertyId={property.id}
        />
      )}
    </div>
  );
} 