import { useState, useTransition } from "react";

import { useProducts } from "../features/products/useProducts";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/ui/ProductSkeleton";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState("all");

  const { data, isLoading, error } = useProducts();

  const filteredProducts = data?.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(data?.map((p) => p.category))];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="mb-6 w-full p-3 rounded-lg border border-gray-200 bg-(--color-surface)"
        onChange={(e) => {
          const value = e.target.value;
          startTransition(() => {
            setSearch(value);
          });
        }}
      />
      {isPending && (
        <p className="text-sm text-(--color-muted) mb-2">Filtering...</p>
      )}

      <div className="flex gap-3 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => startTransition(() => setCategory(cat))}
            className={`px-4 py-1 rounded-full text-sm border transition hover:cursor-pointer
        ${
          category === cat
            ? "bg-(--color-accent) text-white"
            : "bg-(--color-surface) text-(--color-muted)"
        }
      `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

// ****useState vs useTransition****

// **Using only useState**
// Simple
// Works perfectly for most cases
// Might lag if rendering is heavy

// **Using useTransition**
// Adds priority control
// Keeps UI smooth during heavy updates
// Useful for big UI updates, not API calls

//  ****Real-world rule (important)****
// API call = async → no need for transition
// Rendering heavy UI = maybe use transition

//****You usually don’t need useTransition unless:****
// you're rendering large product lists
// applying filters/search on big datasets
// switching tabs with heavy UI
