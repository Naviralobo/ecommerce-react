import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, ShoppingCart, X } from "lucide-react";

// import { useCartStore } from "../../store/CartStore";
import { navLinkClass } from "../../utils/styles";
import { useGetWishlistQuery } from "../../features/wishlist/wishlistApi";
import { useLogoutMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const cart = useCartStore((state) => state.cart);
  const { data } = useGetWishlistQuery();

  const user = useAppSelector((state) => state.auth.user);

  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutMutation();

  // const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = data?.data.products.length ?? 0;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } finally {
      dispatch(logout());
      closeMenu();
      navigate("/login");
    }
  };

  return (
    <header className="bg-(--color-surface)/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight"
            onClick={closeMenu}
          >
            ShopX
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>

            <Link
              to="/cart"
              className="relative text-(--color-muted) hover:text-(--color-text) transition"
            >
              <ShoppingCart />

              {/* {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-(--color-accent) text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )} */}
            </Link>

            <Link
              to="/wishlist"
              className="relative text-(--color-muted) hover:text-(--color-text) transition"
            >
              <Heart />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-(--color-accent) text-white text-xs px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            {user?.role === "seller" && (
              <Link to="/seller">Seller Dashboard</Link>
            )}

            {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={navLinkClass}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link to="/login" className={navLinkClass}>
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="absolute left-0 right-0 top-full md:hidden bg-(--color-surface) border-b border-gray-200 shadow-lg px-4 py-5 flex flex-col gap-4">
            <Link to="/" className={navLinkClass} onClick={closeMenu}>
              Home
            </Link>

            <Link
              to="/cart"
              className={`${navLinkClass} flex items-center justify-between`}
              onClick={closeMenu}
            >
              <span>Cart</span>

              {/* {totalItems > 0 && (
                <span className="bg-(--color-accent) text-white text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )} */}
            </Link>

            <Link
              to="/wishlist"
              className={`${navLinkClass} flex items-center justify-between`}
              onClick={closeMenu}
            >
              <span>Wishlist</span>

              {wishlistCount > 0 && (
                <span className="bg-(--color-accent) text-white text-xs px-2 py-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`${navLinkClass} text-left`}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link to="/login" className={navLinkClass} onClick={closeMenu}>
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
