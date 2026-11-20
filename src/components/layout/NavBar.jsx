
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
} from "lucide-react";

import { getCartCount } from "../../utils/cart";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount);

  // Listen for cart updates
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener("gheelagbe-cart-updated", updateCartCount);

    return () => {
      window.removeEventListener(
        "gheelagbe-cart-updated",
        updateCartCount
      );
    };
  }, []);

  // Close mobile menu when navigating
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="relative z-50 border-b border-default bg-cream">
      <div className="container-custom flex h-20 items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0"
        >
          <span className="font-heading text-2xl text-primary sm:text-3xl">
            Ghee<span className="text-accent">Lagbe</span>
            <span className="text-primary">?</span>
          </span>

          <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
            Purely Natural
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search */}
          <Link
            to="/products"
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:bg-primary-light hover:text-primary"
          >
            <Search size={21} strokeWidth={1.8} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={closeMenu}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="group relative flex items-center gap-2 rounded-full p-2.5 transition-colors hover:bg-primary-light sm:px-4"
          >
            <ShoppingBag
              size={21}
              strokeWidth={1.8}
              className="text-primary transition-transform group-hover:scale-110"
            />

            <span className="hidden text-sm font-semibold text-text sm:block">
              Cart
            </span>

            {/* Dynamic Cart Badge */}
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-primary-dark">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-primary-light lg:hidden"
          >
            {isMenuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-default bg-cream shadow-lg transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? "visible max-h-80 translate-y-0 opacity-100"
            : "invisible max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div className="container-custom flex flex-col py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-default py-4 text-sm font-semibold transition-colors last:border-0 ${
                  isActive
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Mobile Cart Link */}
          <Link
            to="/cart"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-between rounded-xl bg-primary-light px-4 py-3 text-sm font-bold text-primary"
          >
            <span className="flex items-center gap-3">
              <ShoppingBag size={18} />
              My Cart
            </span>

            <span className="rounded-full bg-primary px-2.5 py-1 text-xs text-white">
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
