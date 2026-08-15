import { useState } from "react";

import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import PageWrapper from "../components/common/PageWrapper";
import { useGetProductsQuery } from "../features/products/productApi";

const PRODUCTS_PER_PAGE = 10;

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    search,
    category: category === "all" ? undefined : category,
    page,
    limit: PRODUCTS_PER_PAGE,
  });

  const products = data?.data ?? [];

  /*
   * Reset to page 1 whenever the search/category changes.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  /*
   * Your current API response only gives us the products array.
   * Therefore, until the backend response includes pagination
   * metadata such as totalPages, we determine whether another
   * page exists based on the number of products returned.
   *
   * If 10 products are returned, there may be another page.
   * If fewer than 10 are returned, this is the last page.
   */
  const hasNextPage = products.length === PRODUCTS_PER_PAGE;
  const hasPreviousPage = page > 1;

  /*
   * Categories currently come from the products returned by
   * the current page.
   */
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <p className="text-red-500">Failed to load products</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Search */}
      <input
        type="text"
        value={search}
        placeholder="Search products..."
        className="mb-6 w-full p-3 rounded-lg border border-gray-200 bg-(--color-surface)"
        onChange={handleSearchChange}
      />

      {/* Categories */}
      <div className="flex gap-3 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1 rounded-full text-sm border transition hover:cursor-pointer ${
              category === cat
                ? "bg-(--color-accent) text-white"
                : "bg-(--color-surface) text-(--color-muted)"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading while changing page/search */}
      {isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-(--color-muted) py-10">
          No products found.
        </p>
      ) : (
        <>
          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {(hasPreviousPage || hasNextPage) && (
            <div className="flex items-center justify-center gap-4 mt-10">
              {hasPreviousPage && (
                <button
                  type="button"
                  disabled={isFetching}
                  onClick={() => setPage((previous) => previous - 1)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-(--color-surface) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ← Previous
                </button>
              )}

              <span className="text-sm font-medium">Page {page}</span>

              {hasNextPage && (
                <button
                  type="button"
                  disabled={isFetching}
                  onClick={() => setPage((previous) => previous + 1)}
                  className="px-4 py-2 rounded-lg bg-(--color-accent) text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default Home;
