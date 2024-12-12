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
  };
}

export interface Feature {
  id: string;
  name: string;
  value: string;
} 