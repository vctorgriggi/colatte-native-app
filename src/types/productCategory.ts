import { Product } from "./index";

export interface ProductCategory {
  /* id */
  id: string;

  /* data */
  name: string;
  imageUrl?: string;

  /* timestamps */
  createdAt: string;
  updatedAt: string;

  /* relationships */
  products?: Product[];
}
