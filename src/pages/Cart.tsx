import { useCartStore } from "../store/CartStore";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p className="text-center mt-10">Your cart is empty</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 bg-(--color-surface) p-4 rounded-xl shadow-sm"
          >
            <img
              alt={item.title}
              src={item.image}
              className="h-20 w-20 object-contain"
            />

            <div className="flex-1">
              <h2 className="text-sm font-medium">{item.title}</h2>

              <p className="font-bold mt-1">${item.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

        <button className="mt-4 bg-(--color-accent) text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
