import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer bg-(--color-surface) rounded-xl p-4 shadow-sm hover:shadow-lg transition duration-300"
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
    </div>
  );
};

export default ProductCard;
