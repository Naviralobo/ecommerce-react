import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import type { Product } from "../../types/product";

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
