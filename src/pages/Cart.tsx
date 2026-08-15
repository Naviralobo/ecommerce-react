import PageWrapper from "../components/common/PageWrapper";
import CartItem from "../components/cart/CartItem";
import {
  useClearCartMutation,
  useGetCartQuery,
} from "../features/cart/cartApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCartQuery();

  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();

  if (isLoading) {
    return (
      <PageWrapper>
        <p>Loading cart...</p>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <p>Failed to load cart.</p>
      </PageWrapper>
    );
  }

  const items = data?.data.items ?? [];

  const total = items.reduce(
    (sum, item) => sum + item?.product?.price * item?.quantity,
    0,
  );

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      toast.success("Cart cleared");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to clear cart");
    }
  };

  if (items.length === 0) {
    return (
      <PageWrapper>
        <h1 className="text-2xl font-bold mb-6">Cart</h1>

        <p>Your cart is empty.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Cart</h1>

        <button
          type="button"
          onClick={handleClearCart}
          disabled={isClearing}
          className="text-sm text-red-500"
        >
          {isClearing ? "Clearing..." : "Clear cart"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item?.product?._id} item={item} />
          ))}
        </div>

        <div className="h-fit rounded-xl bg-(--color-surface) p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 bg-(--color-accent) text-white py-3 rounded-lg font-medium hover:opacity-90"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Cart;
