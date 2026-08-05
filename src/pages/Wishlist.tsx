import ProductCard from "../components/product/ProductCard";

import {
  useGetWishlistQuery,
} from "../features/wishlist/wishlistApi";

import PageWrapper from "../components/common/PageWrapper";

const Wishlist = () => {
  const { data, isLoading, error } =
    useGetWishlistQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load wishlist.</p>;
  }

  const products = data?.data.products ?? [];

  if (products.length === 0) {
    return (
      <PageWrapper>
        <h1 className="text-2xl font-bold mb-6">
          Wishlist
        </h1>

        <p>Your wishlist is empty.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6">
        Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Wishlist;