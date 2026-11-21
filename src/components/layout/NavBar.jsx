import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Globe,
} from "lucide-react";

import { getCartCount } from "../../utils/cart";
import { useLanguage } from "../../context/LanguageContext";

const navKeys = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
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
            {t("header.logoTagline")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navKeys.map((link) => (
            <NavLink
              key={link.key}
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
                  {t(`header.nav.${link.key}`)}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={
              language === "bn"
                ? "Switch language to English"
                : "বাংলা ভাষায় পরিবর্তন করুন"
            }
            className="flex items-center gap-1.5 rounded-full border border-[#254D32]/25 bg-white/90 px-3 py-1.5 text-xs font-bold text-primary shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
          >
            <Globe size={14} className="shrink-0" />
            <span className="tracking-wide">
              {language === "bn" ? "EN" : "বাংলা"}
            </span>
          </button>

          {/* Search */}
          <Link
            to="/products"
            aria-label={t("header.searchAria")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:bg-primary-light hover:text-primary"
          >
            <Search size={20} strokeWidth={1.8} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={closeMenu}
            aria-label={t("header.cartAria", { count: cartCount })}
            className="group relative flex items-center gap-2 rounded-full p-2.5 transition-colors hover:bg-primary-light sm:px-4"
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.8}
              className="text-primary transition-transform group-hover:scale-110"
            />

            <span className="hidden text-sm font-semibold text-text sm:block">
              {t("header.cart")}
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
            aria-label={isMenuOpen ? t("header.menuClose") : t("header.menuOpen")}
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
            ? "visible max-h-96 translate-y-0 opacity-100"
            : "invisible max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div className="container-custom flex flex-col py-3">
          {navKeys.map((link) => (
            <NavLink
              key={link.key}
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
                  {t(`header.nav.${link.key}`)}

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
              {t("header.myCart")}
            </span>

            <span className="rounded-full bg-primary px-2.5 py-1 text-xs text-white">
              {cartCount}{" "}
              {cartCount === 1 ? t("header.item") : t("header.items")}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
