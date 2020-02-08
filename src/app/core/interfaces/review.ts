export interface Review {
  id?: number;
  productId: number;
  stars: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
