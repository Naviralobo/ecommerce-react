export interface ProductImage {
  url: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  seller: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}