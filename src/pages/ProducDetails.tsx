import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useGetProductByIdQuery } from "../features/products/productApi";
import ProductDetailsSkeleton from "../components/ui/ProductDetailsSkeleton";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading) return <ProductDetailsSkeleton />;

  if (error || !data) {
    return <p>Product not found</p>;
  }

  const product = data.data;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-(--color-surface) p-6 rounded-xl flex justify-center">
        <img
          src={product.images[0]}
          className="h-80 object-contain"
          alt={product.name}
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="text-gray-600 mt-4">
          {product.description}
        </p>

        <p className="text-xl font-bold mt-6">
          ₹ {product.price}
        </p>

        <button
          onClick={() => {
            toast.success("Cart module coming next...");
          }}
          className="mt-6 bg-(--color-accent) text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
