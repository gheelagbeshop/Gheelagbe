import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  PackageCheck,
  ShoppingBasket,
} from "lucide-react";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../utils/cart";
import { getProductName } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

const formatPrice = (price) =>
  `৳${Number(price || 0).toLocaleString("en-BD")}`;

const CartPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [cartItems, setCartItems] = useState([]);

  const refreshCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    refreshCart();

    window.addEventListener("gheelagbe-cart-updated", refreshCart);

    return () => {
      window.removeEventListener(
        "gheelagbe-cart-updated",
        refreshCart
      );
    };
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const deliveryCharge = subtotal > 0 ? 120 : 0;
  const total = subtotal + deliveryCharge;

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;

    updateCartQuantity(id, quantity);
    refreshCart();
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    refreshCart();
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#FFF9EE] pb-20">
      {/* Hero */}
      <section className="border-b border-[#E8E4D9] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-[#6F746B]">
            <Link to="/" className="transition hover:text-[#254D32]">
              {t("cart.hero.home")}
            </Link>
            <span>/</span>
            <span className="font-medium text-[#254D32]">
              {t("cart.hero.title")}
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold text-[#193B26] sm:text-5xl">
            {t("cart.hero.title")}
          </h1>

          <p className="mt-3 text-sm text-[#6F746B] sm:text-base">
            {t("cart.hero.description")}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#E8F0E8]">
              <ShoppingBag size={42} className="text-[#254D32]" />
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#193B26]">
              {t("cart.empty.title")}
            </h2>

            <p className="mt-3 max-w-sm text-[#6F746B]">
              {t("cart.empty.description")}
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#254D32] px-7 py-3.5 font-semibold text-white transition hover:bg-[#193B26]"
            >
              {t("cart.empty.button")}
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#193B26]">
                  {t("cart.heading")}
                </h2>
                <p className="mt-1 text-sm text-[#6F746B]">
                  {totalItems === 1
                    ? t("cart.itemCountSingle")
                    : t("cart.itemCount", { count: totalItems })}
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#254D32] hover:underline"
              >
                <ArrowLeft size={17} />
                {t("cart.continueShopping")}
              </Link>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[1fr_370px]">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const itemName = getProductName(item, language);
                  const itemWeight =
                    language === "bn" && item.weight_bn
                      ? item.weight_bn
                      : item.weight;

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#E8E4D9] bg-white p-4 sm:p-5"
                    >
                      <div className="flex gap-4 sm:gap-6">
                        <Link
                          to={`/product/${item.slug}`}
                          className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F5F1E8] sm:h-32 sm:w-32"
                        >
                          <img
                            src={item.image}
                            alt={itemName}
                            className="h-full w-full object-cover"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <Link
                                  to={`/product/${item.slug}`}
                                  className="line-clamp-2 font-semibold text-[#193B26] transition hover:text-[#D9A441] sm:text-lg"
                                >
                                  {itemName}
                                </Link>

                                {itemWeight && (
                                  <p className="mt-1 text-sm text-[#6F746B]">
                                    {itemWeight}
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() => handleRemove(item.id)}
                                aria-label={t("cart.removeAria", {
                                  name: itemName,
                                })}
                                className="shrink-0 rounded-lg p-2 text-[#9B9B91] transition hover:bg-red-50 hover:text-red-500"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>

                            <p className="mt-2 font-bold text-[#254D32]">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center rounded-full border border-[#E8E4D9]">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    Number(item.quantity) - 1
                                  )
                                }
                                disabled={Number(item.quantity) <= 1}
                                className="p-2.5 text-[#254D32] transition hover:bg-[#E8F0E8] disabled:opacity-40"
                                aria-label={t("cart.decreaseAria")}
                              >
                                <Minus size={15} />
                              </button>

                              <span className="min-w-8 text-center text-sm font-semibold text-[#193B26]">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    Number(item.quantity) + 1
                                  )
                                }
                                className="p-2.5 text-[#254D32] transition hover:bg-[#E8F0E8]"
                                aria-label={t("cart.increaseAria")}
                              >
                                <Plus size={15} />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-[#193B26]">
                              {formatPrice(
                                Number(item.price) * Number(item.quantity)
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Delivery information */}
                <div className="flex gap-3 rounded-2xl border border-[#E8E4D9] bg-white p-5">
                  <Truck className="shrink-0 text-[#254D32]" size={23} />
                  <div>
                    <h3 className="font-semibold text-[#193B26]">
                      {t("cart.deliveryInfoTitle")}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#6F746B]">
                      {t("cart.deliveryInfoDesc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <aside className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-[#193B26]">
                  {t("cart.summary.title")}
                </h2>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between text-[#6F746B]">
                    <span>
                      {totalItems === 1
                        ? t("cart.summary.subtotalSingle")
                        : t("cart.summary.subtotal", { count: totalItems })}
                    </span>
                    <span className="font-semibold text-[#242820]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#6F746B]">
                    <span>{t("cart.summary.deliveryCharge")}</span>
                    <span className="font-semibold text-[#242820]">
                      {formatPrice(deliveryCharge)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-[#E8E4D9] pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#193B26]">
                        {t("cart.summary.totalAmount")}
                      </span>
                      <span className="text-xl font-bold text-[#254D32]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#254D32] px-5 py-4 font-bold text-white transition hover:bg-[#193B26]"
                >
                  {t("cart.summary.checkoutButton")}
                  <ArrowRight size={19} />
                </button>

                <div className="mt-5 space-y-3 border-t border-[#E8E4D9] pt-5">
                  <div className="flex items-center gap-2 text-xs text-[#6F746B]">
                    <ShieldCheck size={17} className="text-[#254D32]" />
                    {t("cart.summary.badgeSecure")}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6F746B]">
                    <PackageCheck size={17} className="text-[#254D32]" />
                    {t("cart.summary.badgeConfirm")}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6F746B]">
                    <ShoppingBasket size={17} className="text-[#254D32]" />
                    {t("cart.summary.badgeFresh")}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CartPage;
