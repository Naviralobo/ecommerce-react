import { useParams } from "react-router-dom";
import { useProduct } from "../features/products/useProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProduct(id!);

  if (isLoading) return <p>Loading product...</p>;
  if (error || !data) return <p>Product not found</p>;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="bg-(--color-surface) p-6 rounded-xl flex justify-center">
        <img
          src={data.image}
          className="h-80 object-contain"
          alt={data.title}
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-2xl font-bold">{data.title}</h1>

        <p className="text-gray-600 mt-4">{data.description}</p>

        <p className="text-xl font-bold mt-6">${data.price}</p>

        <button className="mt-6 bg-(--color-accent) text-white px-6 py-2 rounded-lg hover:opacity-90 hover:cursor-pointer transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
