export interface Product {
  id: number;
  name: string;
  price: number;
  details: string;
  category: { name: string };
  variations?: { sizes: string[]; colours: string[] };
  images?: { isActive?: number; path?: string }[];
  videos?: { isActive?: number; path?: string }[];
  stock?: number;
  reviews?: {
    stars: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
