import { Link } from "react-router-dom";

import { useCartStore } from "../../store/CartStore";

import { navLinkClass } from "../../utils/styles";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="bg-(--color-surface)/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          ShopX
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <Link to="/" className={navLinkClass}>
            Home
          </Link>

          <Link
            to="/cart"
            className="relative text-(--color-muted hover:text-(--color-text) transition"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-(--color-accent) text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
