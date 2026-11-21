import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import {
  getProductBySlug,
  products,
  getProductName,
  getProductDescription,
  getProductBadge,
  getProductCategory,
  getProductWeight,
  getProductFeatures,
} from "../data/products";
import { addToCart } from "../utils/cart";
import { useLanguage } from "../context/LanguageContext";

const formatPrice = (price) =>
  `৳${price.toLocaleString("en-BD")}`;

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(() => {
    try {
      const saved =
        JSON.parse(localStorage.getItem("gheelagbe-wishlist")) || [];
      return product ? saved.includes(product.id) : false;
    } catch {
      return false;
    }
  });

  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FFF9EE] px-5 text-center">
        <h1 className="font-heading text-4xl">
          {t("productDetails.notFound.title")}
        </h1>
        <p className="mt-3 text-[#6F746B]">
          {t("productDetails.notFound.description")}
        </p>
        <Link
          to="/products"
          className="mt-6 rounded-full bg-[#254D32] px-7 py-3 font-bold text-white"
        >
          {t("productDetails.notFound.button")}
        </Link>
      </main>
    );
  }

  const productName = getProductName(product, language);
  const productDesc = getProductDescription(product, language);
  const badge = getProductBadge(product, language);
  const categoryName = getProductCategory(product, language);
  const weight = getProductWeight(product, language);
  const features = getProductFeatures(product, language);

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 3);

  const toggleWishlist = () => {
    const saved =
      JSON.parse(localStorage.getItem("gheelagbe-wishlist")) || [];

    const updated = wishlisted
      ? saved.filter((id) => id !== product.id)
      : [...saved, product.id];

    localStorage.setItem("gheelagbe-wishlist", JSON.stringify(updated));
    setWishlisted(!wishlisted);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <main className="min-h-screen bg-[#FFF9EE] text-[#242820]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-8">
        {/* BREADCRUMB */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#8A8D84]">
          <Link to="/" className="hover:text-[#254D32]">
            {t("productDetails.breadcrumb.home")}
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#254D32]">
            {t("productDetails.breadcrumb.shop")}
          </Link>
          <span>/</span>
          <span className="capitalize">{categoryName}</span>
          <span>/</span>
          <span className="font-semibold text-[#254D32]">
            {productName}
          </span>
        </div>

        <Link
          to="/products"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#254D32]"
        >
          <ArrowLeft size={17} />
          {t("productDetails.backToShop")}
        </Link>

        {/* PRODUCT */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* IMAGE */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#F0EBDD]">
              <img
                src={product.image}
                alt={productName}
                className="h-full w-full object-cover"
              />

              {badge && (
                <span className="absolute left-5 top-5 rounded-full bg-[#254D32] px-4 py-2 text-xs font-bold text-white">
                  {badge}
                </span>
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B48A35]">
              {categoryName}
            </p>

            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-5xl">
              {productName}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-sm font-bold text-[#254D32]">
                <Star size={17} fill="#D9A441" stroke="#D9A441" />
                {product.rating}
              </div>
              <span className="text-sm text-[#8A8D84]">
                {t("productDetails.reviewsCount", { count: product.reviews })}
              </span>
              <span className="h-4 w-px bg-[#D8D4C9]" />
              <span className="text-sm font-semibold text-[#254D32]">
                {product.inStock
                  ? t("productDetails.inStock")
                  : t("productDetails.outOfStock")}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#254D32]">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-[#A5A69F] line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="rounded-full bg-[#F5E7C5] px-3 py-1 text-xs font-bold text-[#8A692A]">
                    {t("productDetails.savePercent", {
                      percent: Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      ),
                    })}
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 leading-8 text-[#6F746B]">
              {productDesc}
            </p>

            <div className="mt-6 rounded-xl bg-[#E8F0E8] px-5 py-4">
              <p className="text-xs font-semibold text-[#6F746B]">
                {t("productDetails.packageSize")}
              </p>
              <p className="mt-1 font-bold text-[#254D32]">
                {weight}
              </p>
            </div>

            {/* FEATURES */}
            {features.length > 0 && (
              <div className="mt-7">
                <h3 className="mb-4 font-bold">
                  {t("productDetails.highlights")}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#6F746B]"
                    >
                      <Check size={17} className="shrink-0 text-[#254D32]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY + ACTIONS */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <div className="flex h-14 items-center rounded-xl border border-[#E8E4D9] bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 text-[#254D32]"
                  aria-label={t("productDetails.quantity.decreaseAria")}
                >
                  <Minus size={17} />
                </button>
                <span className="min-w-8 text-center font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 text-[#254D32]"
                  aria-label={t("productDetails.quantity.increaseAria")}
                >
                  <Plus size={17} />
                </button>
              </div>

              <button
                onClick={toggleWishlist}
                className={`flex h-14 w-14 items-center justify-center rounded-xl border transition ${
                  wishlisted
                    ? "border-[#254D32] bg-[#254D32] text-white"
                    : "border-[#E8E4D9] bg-white text-[#254D32] hover:bg-[#E8F0E8]"
                }`}
                aria-label={t("productDetails.wishlistAria")}
              >
                <Heart size={21} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#254D32] px-5 py-4 text-sm font-bold text-[#254D32] transition hover:bg-[#E8F0E8] disabled:opacity-50"
              >
                <ShoppingBag size={18} />
                {t("productDetails.addToCart")}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#254D32] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#193B26] disabled:opacity-50"
              >
                {t("productDetails.buyNow")}
                <ArrowRight size={18} />
              </button>
            </div>

            {added && (
              <p className="mt-3 text-sm font-semibold text-[#254D32]">
                {t("productDetails.addedSuccess")}
              </p>
            )}

            {/* SERVICE INFORMATION */}
            <div className="mt-8 grid gap-4 border-t border-[#E8E4D9] pt-7 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Truck className="shrink-0 text-[#254D32]" size={23} />
                <div>
                  <p className="text-sm font-bold">
                    {t("productDetails.services.deliveryTitle")}
                  </p>
                  <p className="text-xs text-[#8A8D84]">
                    {t("productDetails.services.deliveryDesc")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="shrink-0 text-[#254D32]" size={23} />
                <div>
                  <p className="text-sm font-bold">
                    {t("productDetails.services.packagingTitle")}
                  </p>
                  <p className="text-xs text-[#8A8D84]">
                    {t("productDetails.services.packagingDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-[#E8E4D9] pt-14">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B48A35]">
                  {t("productDetails.related.tagline")}
                </p>
                <h2 className="mt-2 font-heading text-3xl sm:text-4xl">
                  {t("productDetails.related.title")}
                </h2>
              </div>
              <Link
                to="/products"
                className="hidden items-center gap-2 text-sm font-bold text-[#254D32] sm:flex"
              >
                {t("productDetails.related.viewAll")} <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#E8E4D9] bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#F0EBDD]">
                    <img
                      src={item.image}
                      alt={getProductName(item, language)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold">
                      {getProductName(item, language)}
                    </h3>
                    <p className="mt-2 font-extrabold text-[#254D32]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
