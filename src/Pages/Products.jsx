
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

import { products, categories } from "../data/products";
import { addToCart } from "../utils/cart";

const MAX_PRICE = Math.max(...products.map((p) => p.price));

const formatPrice = (price) =>
  `৳${price.toLocaleString("en-BD")}`;

function ProductCard({ product, wishlist, toggleWishlist, onAddToCart }) {
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#E8E4D9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1E7]">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#254D32] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {product.badge}
          </span>
        )}

        {product.oldPrice && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-bold text-[#242820]">
            SAVE {Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}%
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
          aria-label="View product"
        >
          <ShoppingBag size={17} />
        </Link>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A17C32]">
            {product.category}
          </span>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#6F746B]">
            <Star size={13} fill="#D9A441" stroke="#D9A441" />
            {product.rating}
            <span className="text-[#A5A69F]">
              ({product.reviews})
            </span>
          </div>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-12 text-sm font-bold leading-6 text-[#242820] transition hover:text-[#254D32] sm:text-base">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-[#8A8D84]">
          {product.weight}
        </p>

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
          {product.inStock ? "Add to Cart" : "Out of Stock"}
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
}) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="mb-4 text-sm font-extrabold">Categories</h3>

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
                  {selectedCategory === category.id && (
                    <Check size={15} />
                  )}
                  {category.name}
                </span>
                <span className="text-xs text-[#A5A69F]">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-[#E8E4D9]" />

      <div>
        <h3 className="mb-4 text-sm font-extrabold">Price Range</h3>

        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg border border-[#E8E4D9] px-3 py-2">
            <span className="text-[10px] text-[#8A8D84]">Minimum</span>
            <p className="text-sm font-bold">{formatPrice(minPrice)}</p>
          </div>
          <div className="flex-1 rounded-lg border border-[#E8E4D9] px-3 py-2">
            <span className="text-[10px] text-[#8A8D84]">Maximum</span>
            <p className="text-sm font-bold">{formatPrice(maxPrice)}</p>
          </div>
        </div>

        <label className="mt-5 block text-xs text-[#6F746B]">
          Minimum price
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
          Maximum price
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
        <h3 className="mb-4 text-sm font-extrabold">Customer Rating</h3>

        {[4, 3, 2, 1].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(rating === value ? 0 : value)}
            className={`mb-3 flex w-full items-center gap-2 text-sm ${
              rating === value
                ? "font-bold text-[#254D32]"
                : "text-[#6F746B]"
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
            & Up
            {rating === value && <Check size={14} />}
          </button>
        ))}
      </div>

      <div className="h-px bg-[#E8E4D9]" />

      <label className="flex cursor-pointer items-center justify-between text-sm">
        <span className="font-semibold">In Stock Only</span>
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
        Clear All Filters
      </button>
    </div>
  );
}

export default function Products() {
  const navigate = useNavigate();

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
        : [...current, id]
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
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

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
    setCartMessage(`${product.name} added to your cart!`);

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
  };

  return (
    <main className="min-h-screen bg-[#FFF9EE] text-[#242820]">
      {/* PAGE HERO */}
      <section className="relative overflow-hidden bg-[#E8F0E8] px-5 py-14 sm:px-8 sm:py-20 lg:px-16">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#D9A441]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#254D32]/15 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#254D32]">
              <Sparkles size={15} />
              Explore our collection
            </div>

            <h1 className="font-['DM_Serif_Display'] text-4xl leading-tight sm:text-6xl">
              Goodness for Your
              <span className="block text-[#254D32]">Everyday Kitchen.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#6F746B] sm:text-base">
              Discover carefully selected ghee, oils, honey and spices.
              Bring authentic flavor and everyday goodness to your table.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.slice(1).map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  document.getElementById("shop-products")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="rounded-full border border-[#254D32]/20 bg-white/70 px-5 py-2.5 text-xs font-bold text-[#254D32] transition hover:bg-[#254D32] hover:text-white"
              >
                {category.name}
              </button>
            ))}
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
              Shop our collection
            </p>
            <h2 className="mt-2 font-['DM_Serif_Display'] text-3xl sm:text-4xl">
              Find Your Favorites
            </h2>
          </div>

          <p className="text-sm text-[#6F746B]">
            Showing <strong className="text-[#254D32]">{filteredProducts.length}</strong>{" "}
            of {products.length} products
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
              placeholder="Search ghee, honey, mustard oil, spices..."
              className="w-full rounded-xl border border-[#E8E4D9] bg-white py-4 pl-12 pr-4 text-sm outline-none transition placeholder:text-[#A5A69F] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8D84]"
                aria-label="Clear search"
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
              Filters
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
                <option value="featured">Featured</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
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
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="sticky top-24 hidden w-64 shrink-0 rounded-2xl border border-[#E8E4D9] bg-white p-6 lg:block">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-extrabold">
                <SlidersHorizontal size={17} />
                Filters
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
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-[#D7D2C5] bg-white px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0E8] text-[#254D32]">
                  <Package size={28} />
                </div>
                <h3 className="font-['DM_Serif_Display'] text-2xl">
                  No Products Found
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#6F746B]">
                  We couldn't find products matching your search or filters.
                  Try changing your selection.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-[#254D32] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#193B26]"
                >
                  Clear Filters
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
              <h2 className="text-xl font-extrabold">Filter Products</h2>
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
              Show {filteredProducts.length} Products
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
            View Cart
          </button>
        </div>
      )}
    </main>
  );
}
