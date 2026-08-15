import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useGetProductByIdQuery } from "../features/products/productApi";
import ProductDetailsSkeleton from "../components/ui/ProductDetailsSkeleton";
import { normalizeImageUrl } from "../utils/image";

import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../features/cart/cartApi";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetProductByIdQuery(id!);

  const { data: cartData } = useGetCartQuery();

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  if (isLoading) return <ProductDetailsSkeleton />;

  if (error || !data) {
    return <p>Product not found</p>;
  }

  const product = data.data;

  const cartItem = cartData?.data.items.find((item) => {
    const cartProductId =
      typeof item?.product === "string" ? item?.product : item?.product?._id;

    return cartProductId === product?._id;
  });

  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      }).unwrap();

      toast.success("Product added to cart");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to add product to cart");
    }
  };

  const handleIncrease = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: quantity + 1,
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update cart");
    }
  };

  const handleDecrease = async () => {
    try {
      if (quantity === 1) {
        await removeFromCart(product._id).unwrap();

        toast.success("Product removed from cart");
        return;
      }

      await addToCart({
        productId: product._id,
        quantity: quantity - 1,
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update cart");
    }
  };

  const isCartUpdating = isAdding || isRemoving;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-(--color-surface) p-6 rounded-xl flex justify-center">
        <img
          src={normalizeImageUrl(product.images[0])}
          className="h-80 object-contain"
          alt={product.name}
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="text-gray-600 mt-4">{product.description}</p>

        <p className="text-xl font-bold mt-6">₹ {product.price}</p>

        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="mt-6 bg-(--color-accent) text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        ) : (
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={isCartUpdating}
              className="w-10 h-10 rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="min-w-6 text-center font-semibold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={isCartUpdating}
              className="w-10 h-10 rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
