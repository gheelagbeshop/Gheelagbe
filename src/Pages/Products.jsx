import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  Star,
  ArrowUpDown,
  X,
  ChevronDown,
  Check,
  Package,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import {
  products,
  categories,
  getProductName,
  getProductDescription,
  getProductBadge,
  getProductCategory,
  getProductWeight,
  getCategoryName,
} from "../data/products";
import { addToCart } from "../utils/cart";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

const MAX_PRICE = Math.max(...products.map((p) => p.price));

const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  onAddToCart,
  language,
  t,
}) {
  const isWishlisted = wishlist.includes(product.id);
  const badge = getProductBadge(product, language);
  const productName = getProductName(product, language);
  const categoryName = getProductCategory(product, language);
  const weight = getProductWeight(product, language);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#E8E4D9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1E7]">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={productName}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </Link>

        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#254D32] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {badge}
          </span>
        )}

        {product.oldPrice && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-bold text-[#242820]">
            {t("products.card.save")}{" "}
            {Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100,
            )}
            %
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            isWishlisted
              ? t("products.card.removeFromWishlist")
              : t("products.card.addToWishlist")
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${
            isWishlisted
              ? "bg-[#254D32] text-white"
              : "bg-white/95 text-[#254D32] hover:bg-[#254D32] hover:text-white"
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <Link
          to={`/product/${product.slug}`}
          className="absolute bottom-3 right-3 hidden h-10 w-10 items-center justify-center rounded-full bg-white text-[#254D32] shadow-sm transition hover:bg-[#254D32] hover:text-white sm:flex"
          aria-label={t("products.card.viewProduct")}
        >
          <ShoppingBag size={17} />
        </Link>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A17C32]">
            {categoryName}
          </span>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#6F746B]">
            <Star size={13} fill="#D9A441" stroke="#D9A441" />
            {product.rating}
            <span className="text-[#A5A69F]">
              {t("products.card.reviews", { count: product.reviews })}
            </span>
          </div>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-12 text-sm font-bold leading-6 text-[#242820] transition hover:text-[#254D32] sm:text-base">
            {productName}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-[#8A8D84]">{weight}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-extrabold text-[#254D32]">
              {formatPrice(product.price)}
            </span>

            {product.oldPrice && (
              <span className="text-xs text-[#A5A69F] line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#254D32] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#193B26] disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-sm"
        >
          <ShoppingBag size={16} />
          {product.inStock
            ? t("products.card.addToCart")
            : t("products.card.outOfStock")}
        </button>
      </div>
    </article>
  );
}

function FilterContent({
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  rating,
  setRating,
  inStockOnly,
  setInStockOnly,
  clearFilters,
  language,
  t,
}) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="mb-4 text-sm font-extrabold">
          {t("products.categoriesTitle")}
        </h3>

        <div className="space-y-3">
          {categories.map((category) => {
            const count =
              category.id === "all"
                ? products.length
                : products.filter((p) => p.category === category.id).length;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex w-full items-center justify-between text-left text-sm transition ${
                  selectedCategory === category.id
                    ? "font-bold text-[#254D32]"
                    : "text-[#6F746B] hover:text-[#254D32]"
                }`}
              >
                <span className="flex items-center gap-2">
                  {selectedCategory === category.id && <Check size={15} />}
                  {getCategoryName(category, language)}
                </span>
                <span className="text-xs text-[#A5A69F]">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-[#E8E4D9]" />

      <div>
        <h3 className="mb-4 text-sm font-extrabold">
          {t("products.priceRange")}
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg border border-[#E8E4D9] px-3 py-2">
            <span className="text-[10px] text-[#8A8D84]">
              {t("products.minimum")}
            </span>
            <p className="text-sm font-bold">{formatPrice(minPrice)}</p>
          </div>
          <div className="flex-1 rounded-lg border border-[#E8E4D9] px-3 py-2">
            <span className="text-[10px] text-[#8A8D84]">
              {t("products.maximum")}
            </span>
            <p className="text-sm font-bold">{formatPrice(maxPrice)}</p>
          </div>
        </div>

        <label className="mt-5 block text-xs text-[#6F746B]">
          {t("products.minimumPrice")}
        </label>
        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          step="10"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.min(Number(e.target.value), maxPrice))
          }
          className="mt-2 w-full accent-[#254D32]"
        />

        <label className="mt-3 block text-xs text-[#6F746B]">
          {t("products.maximumPrice")}
        </label>
        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          step="10"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Math.max(Number(e.target.value), minPrice))
          }
          className="mt-2 w-full accent-[#254D32]"
        />
      </div>

      <div className="h-px bg-[#E8E4D9]" />

      <div>
        <h3 className="mb-4 text-sm font-extrabold">
          {t("products.customerRating")}
        </h3>

        {[4, 3, 2, 1].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(rating === value ? 0 : value)}
            className={`mb-3 flex w-full items-center gap-2 text-sm ${
              rating === value ? "font-bold text-[#254D32]" : "text-[#6F746B]"
            }`}
          >
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < value ? "#D9A441" : "none"}
                  stroke={i < value ? "#D9A441" : "#B8B8B0"}
                />
              ))}
            </span>
            {t("products.andUp")}
            {rating === value && <Check size={14} />}
          </button>
        ))}
      </div>

      <div className="h-px bg-[#E8E4D9]" />

      <label className="flex cursor-pointer items-center justify-between text-sm">
        <span className="font-semibold">{t("products.inStockOnly")}</span>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 accent-[#254D32]"
        />
      </label>

      <button
        type="button"
        onClick={clearFilters}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E8E4D9] py-3 text-sm font-bold text-[#254D32] transition hover:bg-[#E8F0E8]"
      >
        <RotateCcw size={15} />
        {t("products.clearAllFilters")}
      </button>
    </div>
  );
}

export default function Products() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [rating, setRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gheelagbe-wishlist")) || [];
    } catch {
      return [];
    }
  });
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("gheelagbe-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    setRating(0);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const filteredProducts = useMemo(() => {
    const searchLower = search.toLowerCase().trim();

    let result = products.filter((product) => {
      const nameEn = (product.name_en || product.name || "").toLowerCase();
      const nameBn = (product.name_bn || "").toLowerCase();
      const descEn = (
        product.description_en ||
        product.description ||
        ""
      ).toLowerCase();
      const descBn = (product.description_bn || "").toLowerCase();
      const catEn = (
        product.category_en ||
        product.category ||
        ""
      ).toLowerCase();
      const catBn = (product.category_bn || "").toLowerCase();

      const matchesSearch =
        !searchLower ||
        nameEn.includes(searchLower) ||
        nameBn.includes(searchLower) ||
        descEn.includes(searchLower) ||
        descBn.includes(searchLower) ||
        catEn.includes(searchLower) ||
        catBn.includes(searchLower);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      const matchesRating = !rating || product.rating >= rating;
      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "popular":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    rating,
    inStockOnly,
    sortBy,
  ]);

  const handleAddToCart = (product) => {
    addToCart(product);
    const productName = getProductName(product, language);
    setCartMessage(t("products.toastAdded", { name: productName }));

    window.setTimeout(() => setCartMessage(""), 2500);
  };

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    rating,
    setRating,
    inStockOnly,
    setInStockOnly,
    clearFilters,
    language,
    t,
  };
  const heroProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FFF9EE] text-[#242820]">
      <SEO
        title="সকল পণ্য | GheeLagbe"
        description="GheeLagbe-এ খুঁজে নিন খাঁটি ঘি, সরিষার তেল, প্রাকৃতিক গুড় এবং অন্যান্য মানসম্মত খাদ্যসামগ্রী।"
        canonical="https://gheelagbe.com/products"
      />
      {/* PAGE HERO */}
      <section className="relative isolate overflow-hidden bg-[#E8F0E8]">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#254D32]/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#D9A441]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-16">
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#254D32]/15 bg-white/70 px-4 py-2 text-xs font-bold text-[#254D32] shadow-sm backdrop-blur">
              <Sparkles size={15} className="text-[#B48A35]" />
              {t("products.hero.badge")}
            </div>

            <h1 className="font-heading text-4xl leading-[1.2] tracking-tight text-[#242820] sm:text-5xl lg:text-6xl">
              {t("products.hero.titleStart")}
              <span className="mt-1 block text-[#254D32]">
                {t("products.hero.titleHighlight")}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-8 text-[#6F746B] sm:text-base">
              {t("products.hero.description")}
            </p>

            {/* Category shortcuts */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {categories.slice(1).map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    document.getElementById("shop-products")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="rounded-full border border-[#254D32]/20 bg-white/75 px-4 py-2.5 text-xs font-bold text-[#254D32] transition-all duration-300 hover:-translate-y-1 hover:bg-[#254D32] hover:text-white hover:shadow-lg sm:px-5"
                >
                  {getCategoryName(category, language)}
                </button>
              ))}
            </div>

            {/* Trust highlights */}
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#254D32]/10 pt-6">
              <div>
                <p className="text-xl font-extrabold text-[#254D32]">100%</p>
                <p className="text-[11px] text-[#6F746B]">
                  {language === "bn" ? "প্রাকৃতিক পণ্য" : "Natural Products"}
                </p>
              </div>

              <div className="h-9 w-px bg-[#254D32]/15" />

              <div>
                <p className="text-xl font-extrabold text-[#254D32]">৳120</p>
                <p className="text-[11px] text-[#6F746B]">
                  {language === "bn"
                    ? "নির্দিষ্ট ডেলিভারি চার্জ"
                    : "Fixed Delivery Charge"}
                </p>
              </div>

              <div className="h-9 w-px bg-[#254D32]/15" />

              <div>
                <p className="text-xl font-extrabold text-[#254D32]">COD</p>
                <p className="text-[11px] text-[#6F746B]">
                  {language === "bn" ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT SHOWCASE */}
          <div className="relative mx-auto w-full max-w-[550px] lg:ml-auto">
            {/* Decorative circle */}
            <div className="absolute left-1/2 top-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#254D32]/10 bg-[#254D32]/[0.025]" />

            <div className="relative grid grid-cols-2 items-center gap-3 sm:gap-5">
              {/* Main featured product */}
              {heroProducts[0] && (
                <Link
                  to={`/product/${heroProducts[0].slug}`}
                  className="group relative col-span-2 overflow-hidden rounded-[28px] bg-white shadow-xl shadow-[#254D32]/10 transition duration-500 hover:-translate-y-1 sm:col-span-1 sm:row-span-2"
                >
                  <div className="aspect-[4/5] overflow-hidden sm:aspect-[3/5]">
                    <img
                      src={heroProducts[0].image}
                      alt={getProductName(heroProducts[0], language)}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-20 text-white">
                    <span className="mb-2 inline-block rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-bold text-[#242820]">
                      {language === "bn" ? "জনপ্রিয় পণ্য" : "POPULAR PRODUCT"}
                    </span>

                    <h3 className="text-lg font-bold">
                      {getProductName(heroProducts[0], language)}
                    </h3>

                    <p className="mt-1 text-sm font-extrabold text-[#F5E7C5]">
                      {formatPrice(heroProducts[0].price)}
                    </p>
                  </div>
                </Link>
              )}

              {/* Secondary product */}
              {heroProducts[1] && (
                <Link
                  to={`/product/${heroProducts[1].slug}`}
                  className="group relative overflow-hidden rounded-[24px] bg-white shadow-lg shadow-[#254D32]/10 transition duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={heroProducts[1].image}
                      alt={getProductName(heroProducts[1], language)}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="line-clamp-1 text-sm font-bold text-[#242820]">
                      {getProductName(heroProducts[1], language)}
                    </h3>
                    <p className="mt-1 text-sm font-extrabold text-[#254D32]">
                      {formatPrice(heroProducts[1].price)}
                    </p>
                  </div>
                </Link>
              )}

              {/* Third product */}
              {heroProducts[2] && (
                <Link
                  to={`/product/${heroProducts[2].slug}`}
                  className="group relative overflow-hidden rounded-[24px] bg-white shadow-lg shadow-[#254D32]/10 transition duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={heroProducts[2].image}
                      alt={getProductName(heroProducts[2], language)}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="line-clamp-1 text-sm font-bold text-[#242820]">
                      {getProductName(heroProducts[2], language)}
                    </h3>
                    <p className="mt-1 text-sm font-extrabold text-[#254D32]">
                      {formatPrice(heroProducts[2].price)}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            {/* Floating quality badge */}
            <div className="absolute -right-2 top-5 z-10 flex items-center gap-2 rounded-2xl border border-[#E8E4D9] bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur sm:-right-5 sm:px-4 sm:py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F0E8] text-[#254D32]">
                <Sparkles size={17} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#254D32]">
                  {language === "bn" ? "বিশুদ্ধ ও প্রাকৃতিক" : "Pure & Natural"}
                </p>
                <p className="text-[10px] text-[#8A8D84]">
                  {language === "bn"
                    ? "আপনার পরিবারের জন্য"
                    : "Made for your family"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP AREA */}
      <section
        id="shop-products"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-8 lg:py-16"
      >
        {/* TITLE */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B48A35]">
              {t("products.section.tagline")}
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
              {t("products.section.title")}
            </h2>
          </div>

          <p className="text-sm text-[#6F746B]">
            {t("products.section.showingCount", {
              shown: filteredProducts.length,
              total: products.length,
            })}
          </p>
        </div>

        {/* SEARCH + SORT */}
        <div className="mb-7 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8D84]"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("products.searchPlaceholder")}
              className="w-full rounded-xl border border-[#E8E4D9] bg-white py-4 pl-12 pr-4 text-sm outline-none transition placeholder:text-[#A5A69F] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8D84]"
                aria-label={t("products.clearSearch")}
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E8E4D9] bg-white px-5 py-4 text-sm font-bold text-[#254D32] lg:hidden"
            >
              <SlidersHorizontal size={17} />
              {t("products.filterButton")}
            </button>

            <div className="relative flex-1 lg:flex-none">
              <ArrowUpDown
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#254D32]"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#E8E4D9] bg-white py-4 pl-11 pr-10 text-sm font-semibold outline-none focus:border-[#254D32] sm:min-w-52"
              >
                <option value="featured">{t("products.sort.featured")}</option>
                <option value="popular">{t("products.sort.popular")}</option>
                <option value="newest">{t("products.sort.newest")}</option>
                <option value="price-low">{t("products.sort.priceLow")}</option>
                <option value="price-high">
                  {t("products.sort.priceHigh")}
                </option>
                <option value="rating">{t("products.sort.rating")}</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6F746B]"
              />
            </div>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`shrink-0 rounded-full px-5 py-3 text-xs font-bold transition sm:text-sm ${
                selectedCategory === category.id
                  ? "bg-[#254D32] text-white shadow-md"
                  : "border border-[#E8E4D9] bg-white text-[#6F746B] hover:border-[#254D32] hover:text-[#254D32]"
              }`}
            >
              {getCategoryName(category, language)}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="sticky top-24 hidden w-64 shrink-0 rounded-2xl border border-[#E8E4D9] bg-white p-6 lg:block">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-extrabold">
                <SlidersHorizontal size={17} />
                {t("products.filterButton")}
              </h3>
            </div>

            <FilterContent {...filterProps} />
          </aside>

          {/* PRODUCT GRID */}
          <div className="min-w-0 flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    onAddToCart={handleAddToCart}
                    language={language}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-[#D7D2C5] bg-white px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0E8] text-[#254D32]">
                  <Package size={28} />
                </div>
                <h3 className="font-heading text-2xl">
                  {t("products.empty.title")}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#6F746B]">
                  {t("products.empty.description")}
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-[#254D32] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#193B26]"
                >
                  {t("products.empty.clearButton")}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      {showFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-[#FFF9EE] p-6 shadow-2xl">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">
                {t("products.filterTitle")}
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#254D32]"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <FilterContent {...filterProps} />

            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full rounded-xl bg-[#254D32] py-4 text-sm font-bold text-white"
            >
              {t("products.showProductsBtn", {
                count: filteredProducts.length,
              })}
            </button>
          </div>
        </div>
      )}

      {/* CART MESSAGE */}
      {cartMessage && (
        <div className="fixed bottom-5 left-1/2 z-[110] flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#193B26] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          <Check size={19} className="shrink-0 text-[#D9A441]" />
          <span className="flex-1">{cartMessage}</span>
          <button
            onClick={() => navigate("/cart")}
            className="shrink-0 font-bold text-[#F5E7C5] underline underline-offset-4"
          >
            {t("products.viewCart")}
          </button>
        </div>
      )}
    </main>
  );
}
