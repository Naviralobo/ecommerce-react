import { Link } from "react-router-dom";
import { navLinkClass } from "../../utils/styles";

const Navbar = () => {
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

          <Link to="/cart" className={navLinkClass}>
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
