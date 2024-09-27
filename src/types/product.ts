import { ProductCategory, ProductImage } from "./index";

export interface Product {
  /* id */
  id: string;

  /* data */
  name: string;
  description?: string;
  productCategoryId: string;

  /* timestamps */
  createdAt: string;
  updatedAt: string;

  /* relationships */
  productCategory: ProductCategory;
  productImages?: ProductImage[];
}
