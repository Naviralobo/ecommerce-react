import ProductCard from "../components/product/ProductCard";
import { useWishlistStore } from "../store/wishlistStore";

const Wishlist = () => {
  const { wishlist } = useWishlistStore();

  if (wishlist.length === 0) {
    return <p className="text-center mt-10">No items in wishlist</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {wishlist.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Wishlist;
