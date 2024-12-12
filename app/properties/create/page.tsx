"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ImageUpload } from "@/components/ui/image-upload";

export default function CreatePropertyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    listingType: "",
    location: "",
    address: "",
  });
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    const isAgent = session?.user?.role === 'AGENT' || session?.user?.role === 'AGENT_PREMIUM';
    if (status === 'authenticated' && !isAgent) {
      router.push('/pricing');
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!session?.user?.token) {
        throw new Error("Non authentifié");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          images,
          features: []
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Annonce créée avec succès");
      router.push("/properties");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la création");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Créer une nouvelle annonce</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Titre</label>
          <Input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Prix</label>
            <Input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type de bien</label>
            <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOUSE">Maison</SelectItem>
                <SelectItem value="APARTMENT">Appartement</SelectItem>
                <SelectItem value="LAND">Terrain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type d&apos;annonce</label>
          <Select onValueChange={(value) => setFormData({ ...formData, listingType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SALE">Vente</SelectItem>
              <SelectItem value="RENT">Location</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Localisation</label>
          <Input
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Adresse</label>
          <Input
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Images</label>
          <ImageUpload
            value={images}
            onChange={(url) => setImages((current) => [...current, url])}
            onRemove={(url) => setImages((current) => current.filter((i) => i !== url))}
          />
          <p className="text-xs text-gray-500 mt-2">
            Ajoutez jusqu&apos;à 5 images de votre propriété
          </p>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Création..." : "Créer l'annonce"}
        </Button>
      </form>
    </div>
  );
} 