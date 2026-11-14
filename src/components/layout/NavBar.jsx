import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-default bg-cream">
      <div className="container-custom flex h-20 items-center justify-between gap-6">

        {/* Logo */}
        <a href="/" className="shrink-0">
          <span className="font-heading text-3xl text-primary">
            Ghee<span className="text-accent">Lagbe</span>
            <span className="text-primary">.</span>
          </span>
          <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
            Purely Natural
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-text transition-colors duration-200 hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Search */}
          <button
            type="button"
            aria-label="Search products"
            className="hidden rounded-full p-2 text-text transition-colors hover:bg-primary-light hover:text-primary sm:block"
          >
            <Search size={21} strokeWidth={1.8} />
          </button>

          {/* Cart */}
          <a
            href="/cart"
            aria-label="Shopping cart"
            className="group relative flex items-center gap-2 p-2.5 transition-colors hover:bg-primary-light sm:px-4"
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.8}
              className="text-primary"
            />

            <span className="hidden text-sm font-semibold text-text sm:block">
              Cart
            </span>

            <span className="absolute -right-4 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary-dark">
              0
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="rounded-lg p-2 text-primary transition-colors hover:bg-primary-light lg:hidden"
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
        className={`overflow-hidden border-t border-default bg-cream transition-all duration-300 lg:hidden ${
          isMenuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="container-custom flex flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-default py-3 text-sm font-semibold text-text transition-colors last:border-0 hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

