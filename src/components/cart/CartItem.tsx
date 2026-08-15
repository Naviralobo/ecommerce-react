import type { CartItem as CartItemType } from "../../types/cart";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../../features/cart/cartApi";
import toast from "react-hot-toast";

type Props = {
  item: CartItemType;
};

const CartItem = ({ item }: Props) => {
  const [addToCart, { isLoading: isUpdating }] = useAddToCartMutation();

  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  const handleIncrease = async () => {
    try {
      await addToCart({
        productId: item.product._id,
        quantity: item.quantity + 1,
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update cart");
    }
  };

  const handleDecrease = async () => {
    try {
      if (item.quantity === 1) {
        await removeFromCart(item.product._id).unwrap();
        toast.success("Removed from cart");
        return;
      }

      await addToCart({
        productId: item.product._id,
        quantity: item.quantity - 1,
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update cart");
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.product._id).unwrap();
      toast.success("Removed from cart");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to remove from cart");
    }
  };

  const subtotal = item?.product?.price * item.quantity;

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4">
      <img
        src={item?.product?.images[0]}
        alt={item?.product?.name}
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1">
        <h2 className="font-medium">{item?.product?.name}</h2>

        <p className="mt-1 text-sm text-gray-500">${item?.product?.price}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={isUpdating || isRemoving}
            className="w-8 h-8 border rounded"
          >
            −
          </button>

          <span>{item?.quantity}</span>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={isUpdating || isRemoving}
            className="w-8 h-8 border rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold">${subtotal}</p>

        <button
          type="button"
          onClick={handleRemove}
          disabled={isUpdating || isRemoving}
          className="mt-2 text-sm text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
