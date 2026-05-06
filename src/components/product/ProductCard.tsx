import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { useWishlistStore } from "../../store/wishlistStore";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      // whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        navigate(`/product/${product.id}`);
      }}
      className="relative cursor-pointer bg-(--color-surface) rounded-xl p-4 shadow-sm hover:shadow-lg"
    >
      <div className="h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <h2 className="text-sm font-medium mt-3 line-clamp-2">{product.title}</h2>

      <p className="mt-2 font-bold text-(--color-text)">${product.price}</p>
      {/* stopProagation doesnt work because of the animation. so we use the closest  button target onn the card */}
      <button
        type="button"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => {
          // e.stopPropagation();
          toggleWishlist(product);
        }}
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
