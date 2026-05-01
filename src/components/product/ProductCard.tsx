import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer bg-(--color-surface) rounded-xl p-4 shadow-sm hover:shadow-lg"
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
    </motion.div>
  );
};

export default ProductCard;
