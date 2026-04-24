import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import type { Product } from "../../types/product";

const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const useProduct = (id: string) => {
  return useQuery({
    // saves the product data in the cache with a unique key that includes the product ID, allowing for efficient retrieval and caching of individual product data
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    // ensures that the query will only run if a valid product ID is provided, preventing unnecessary API calls and potential errors when the ID is missing or invalid
    enabled: !!id,
  });
};
