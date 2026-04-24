import { useCartStore } from "../store/CartStore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="mb-4">
            <p>{item.title}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
