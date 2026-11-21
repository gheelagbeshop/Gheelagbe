
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Globe,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Leaf,
  Sparkles,
} from "lucide-react";

import { getCartCount } from "../../utils/cart";
import { useLanguage } from "../../context/LanguageContext";

const navKeys = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const categoryItems = [
  {
    id: "ghee",
    en: "Pure Ghee",
    bn: "খাঁটি ঘি",
    descriptionEn: "Richness for every meal",
    descriptionBn: "প্রতিদিনের খাবারে সমৃদ্ধ স্বাদ",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "oil",
    en: "Mustard Oil",
    bn: "সরিষার তেল",
    descriptionEn: "A familiar kitchen essential",
    descriptionBn: "রান্নাঘরের পরিচিত উপকরণ",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "honey",
    en: "Natural Honey",
    bn: "প্রাকৃতিক মধু",
    descriptionEn: "A little natural sweetness",
    descriptionBn: "প্রকৃতির মিষ্টতা",
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: "spices",
    en: "Spices",
    bn: "মসলা",
    descriptionEn: "The aroma of home",
    descriptionBn: "ঘরের রান্নার সুবাস",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=85",
  },
];

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] =
    useState(false);
  const [cartCount, setCartCount] = useState(getCartCount);

  const bn = language === "bn";

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());

    window.addEventListener(
      "gheelagbe-cart-updated",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "gheelagbe-cart-updated",
        updateCartCount
      );
    };
  }, []);

  // Close menus after navigation
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaOpen(false);
    setIsMobileCategoriesOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close desktop menu with Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMegaOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMegaOpen(false);
  };

  const openMobileMenu = () => setIsMenuOpen(true);

  return (
    <>
      <nav
        className="relative z-50 border-b border-[#e8e4d9] bg-[#fff9ee]"
        onMouseLeave={() => setIsMegaOpen(false)}
      >
        <div className="container-custom flex h-[76px] items-center justify-between gap-4">

          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group shrink-0"
          >
            <span className="font-heading text-2xl text-primary sm:text-3xl">
              Ghee<span className="text-accent">Lagbe</span>
              <span className="text-primary">?</span>
            </span>

            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
              {t("header.logoTagline")}
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden h-full items-center gap-8 lg:flex">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative flex h-full items-center text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`
              }
            >
              {t("header.nav.home")}
            </NavLink>

            {/* SHOP MEGA MENU */}
            <div
              className="flex h-full items-center"
              onMouseEnter={() => setIsMegaOpen(true)}
            >
              <button
                type="button"
                onClick={() => setIsMegaOpen((prev) => !prev)}
                onFocus={() => setIsMegaOpen(true)}
                aria-expanded={isMegaOpen}
                className={`flex h-full items-center gap-2 text-sm font-semibold transition-colors ${
                  isMegaOpen ||
                  location.pathname.startsWith("/products") ||
                  location.pathname.startsWith("/product/")
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`}
              >
                {t("header.nav.products")}
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-300 ${
                    isMegaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`
              }
            >
              {t("header.nav.about")}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`
              }
            >
              {t("header.nav.contact")}
            </NavLink>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-2 sm:gap-3 lg:flex">

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-full border border-primary/20 px-3 py-2 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              <Globe size={14} />
              {bn ? "EN" : "বাংলা"}
            </button>

            <Link
              to="/products"
              aria-label={t("header.searchAria")}
              className="flex h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-[#e8f0e8] hover:text-primary"
            >
              <Search size={19} strokeWidth={1.8} />
            </Link>

            <Link
              to="/cart"
              aria-label={t("header.cartAria", { count: cartCount })}
              className="group relative flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-[#e8f0e8]"
            >
              <ShoppingBag
                size={20}
                className="text-primary transition-transform group-hover:scale-110"
              />

              <span className="text-sm font-semibold text-text">
                {t("header.cart")}
              </span>

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-[#193b26]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/cart"
              aria-label={t("header.cartAria", { count: cartCount })}
              className="relative flex h-10 w-10 items-center justify-center text-primary"
            >
              <ShoppingBag size={21} />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-primary-dark">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openMobileMenu}
              aria-label={t("header.menuOpen")}
              className="flex h-10 w-10 items-center justify-center text-primary transition hover:bg-[#e8f0e8]"
            >
              <Menu size={25} />
            </button>
          </div>
        </div>

        {/* DESKTOP MEGA MENU */}
        <div
          className={`absolute left-0 right-0 top-full hidden border-t border-[#e8e4d9] bg-[#fffdf7] shadow-[0_25px_60px_rgba(25,59,38,0.12)] transition-all duration-300 lg:block ${
            isMegaOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0 pointer-events-none"
          }`}
        >
          <div className="container-custom grid grid-cols-[1fr_300px] gap-12 py-10 xl:grid-cols-[1fr_340px]">

            {/* CATEGORIES */}
            <div>
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.25em] text-[#a17b3c]">
                    {bn ? "আমাদের সংগ্রহ" : "EXPLORE OUR COLLECTION"}
                  </p>

                  <h3 className="font-heading text-2xl text-[#242820]">
                    {bn ? "আপনার পছন্দের বিভাগ" : "Shop by category"}
                  </h3>
                </div>

                <Link
                  to="/products"
                  onClick={closeMenu}
                  className="group flex items-center gap-2 text-xs font-bold text-primary hover:text-accent"
                >
                  {bn ? "সব পণ্য দেখুন" : "View all products"}
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {categoryItems.map((item) => (
                  <Link
                    key={item.id}
                    to="/products"
                    onClick={closeMenu}
                    className="group min-w-0"
                  >
                    <div className="relative aspect-[1.2] overflow-hidden bg-[#e8eee5]">
                      <img
                        src={item.image}
                        alt={bn ? item.bn : item.en}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center bg-[#fff9ee] text-primary opacity-0 transition-all group-hover:opacity-100">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>

                    <h4 className="mt-3 text-sm font-bold text-[#242820] transition-colors group-hover:text-primary">
                      {bn ? item.bn : item.en}
                    </h4>

                    <p className="mt-1 text-[10px] leading-5 text-[#85897e]">
                      {bn ? item.descriptionBn : item.descriptionEn}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* FEATURED PANEL */}
            <div className="relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-[#1d3828] p-7 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(217,164,65,.2),transparent_45%)]" />

              <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-white/20 text-[#e2c17d]">
                <Leaf size={21} />
              </div>

              <div className="relative">
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[.25em] text-[#e2c17d]">
                  GHEELAGBE
                </p>

                <h3 className="max-w-[240px] font-heading text-3xl leading-tight">
                  {bn
                    ? "প্রতিদিনের খাবারে থাকুক প্রকৃতির ছোঁয়া।"
                    : "A little closer to the goodness of nature."}
                </h3>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="mt-6 inline-flex items-center gap-3 border-b border-[#d9a441] pb-2 text-xs font-bold text-white transition hover:text-[#e2c17d]"
                >
                  {bn ? "আমাদের গল্প" : "Discover our story"}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE BACKDROP */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[80] bg-[#102116]/55 backdrop-blur-[3px] transition-opacity duration-300 lg:hidden ${
          isMenuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* MOBILE RIGHT DRAWER */}
      <aside
        aria-hidden={!isMenuOpen}
        className={`fixed right-0 top-0 z-[90] flex h-[100dvh] w-full max-w-[420px] flex-col bg-[#fff9ee] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-[78px] shrink-0 items-center justify-between border-b border-[#e8e4d9] px-6">
          <Link to="/" onClick={closeMenu}>
            <span className="font-heading text-2xl text-primary">
              Ghee<span className="text-accent">Lagbe</span>?
            </span>
            <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[.22em] text-text-secondary">
              {t("header.logoTagline")}
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label={t("header.menuClose")}
            className="flex h-10 w-10 items-center justify-center border border-[#e8e4d9] text-primary transition hover:bg-primary hover:text-white"
          >
            <X size={21} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-7">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.25em] text-[#a17b3c]">
            {bn ? "মেনু" : "NAVIGATION"}
          </p>

          <div className="space-y-1">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-[#e8e4d9] py-4 font-heading text-2xl ${
                  isActive ? "text-primary" : "text-[#343b32]"
                }`
              }
            >
              {t("header.nav.home")}
              <ArrowUpRight size={19} />
            </NavLink>

            {/* Mobile Categories Expand */}
            <div className="border-b border-[#e8e4d9]">
              <button
                type="button"
                onClick={() =>
                  setIsMobileCategoriesOpen((prev) => !prev)
                }
                aria-expanded={isMobileCategoriesOpen}
                className="flex w-full items-center justify-between py-4 font-heading text-2xl text-[#343b32]"
              >
                {t("header.nav.products")}

                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    isMobileCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isMobileCategoriesOpen
                    ? "grid-rows-[1fr] pb-4 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <Link
                    to="/products"
                    onClick={closeMenu}
                    className="mb-3 block text-xs font-bold text-primary"
                  >
                    {bn ? "সব পণ্য দেখুন →" : "View all products →"}
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    {categoryItems.map((item) => (
                      <Link
                        key={item.id}
                        to="/products"
                        onClick={closeMenu}
                        className="group flex items-center gap-3 bg-[#f0f1e9] p-2"
                      >
                        <img
                          src={item.image}
                          alt={bn ? item.bn : item.en}
                          className="h-12 w-12 object-cover"
                        />

                        <span className="text-xs font-semibold text-[#354333]">
                          {bn ? item.bn : item.en}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navKeys
              .filter((item) => item.key !== "home" && item.key !== "products")
              .map((item) => (
                <NavLink
                  key={item.key}
                  to={item.href}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-[#e8e4d9] py-4 font-heading text-2xl ${
                      isActive ? "text-primary" : "text-[#343b32]"
                    }`
                  }
                >
                  {t(`header.nav.${item.key}`)}
                  <ArrowUpRight size={19} />
                </NavLink>
              ))}
          </div>

          {/* Mobile Feature */}
          <div className="relative mt-9 overflow-hidden bg-[#1d3828] p-6 text-white">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />
            <Sparkles size={20} className="mb-4 text-[#d9a441]" />

            <p className="font-heading text-2xl leading-tight">
              {bn
                ? "আপনার রান্নাঘরের জন্য ভালো কিছু।"
                : "Something good for your kitchen."}
            </p>

            <Link
              to="/products"
              onClick={closeMenu}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#e2c17d]"
            >
              {bn ? "কেনাকাটা শুরু করুন" : "Start shopping"}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="shrink-0 border-t border-[#e8e4d9] bg-[#f6f3e9] px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 border border-primary/20 px-4 py-3 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              <Globe size={16} />
              {bn ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
            </button>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center gap-2 bg-primary px-4 py-3 text-xs font-bold text-white"
            >
              <ShoppingBag size={16} />
              {t("header.myCart")}
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-primary-dark">
                {cartCount}
              </span>
            </Link>
          </div>

          <a
            href="tel:+8801644945406"
            className="mt-4 block text-center text-[11px] text-[#777e70]"
          >
            {t("header.announcement.needHelp")} · +880 1644-945406
          </a>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
