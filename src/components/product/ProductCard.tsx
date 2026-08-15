import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import { normalizeImageUrl } from "../../utils/image";

import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../features/wishlist/wishlistApi";
import type { ApiError } from "../../types/api";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const { data } = useGetWishlistQuery();

  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();

  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();

  const isWishlistLoading = isAdding || isRemoving;

  const isWishlisted =
    data?.data.products.some((p) => p._id === product._id) ?? false;

  const handleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(product._id).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message ?? "Wishlist operation failed");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      // whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        navigate(`/product/${product._id}`);
      }}
      className="relative cursor-pointer bg-(--color-surface) rounded-xl p-4 shadow-sm hover:shadow-lg"
    >
      <div className="h-40 flex items-center justify-center">
        <img
          src={normalizeImageUrl(product.images[0])}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      <h2 className="text-sm font-medium mt-3 line-clamp-2">{product.name}</h2>

      <p className="mt-2 font-bold text-(--color-text)">${product.price}</p>
      {/* stopProagation doesnt work because of the animation. so we use the closest  button target onn the card */}
      <button
        type="button"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={handleWishlist}
        disabled={isWishlistLoading}
        className="absolute top-3 right-3"
      >
        <Heart
          className={`cursor-pointer w-5 h-5 ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>
    </motion.div>
  );
};

export default ProductCard;
