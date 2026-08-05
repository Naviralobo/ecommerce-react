import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/CartStore";

import { navLinkClass } from "../../utils/styles";
import { useGetWishlistQuery } from "../../features/wishlist/wishlistApi";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const { data } = useGetWishlistQuery();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = data?.data.products.length ?? 0;
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
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-(--color-accent) text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/wishlist"
            className="relative text-(--color-muted hover:text-(--color-text) transition"
          >
            <Heart />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-(--color-accent) text-white text-xs px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
