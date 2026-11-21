import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";

import { getCart, clearCart } from "../utils/cart";
import { getProductName } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

const DELIVERY_CHARGE = 120;

// Demo coupon. Replace this with the actual coupon rules later.
const COUPONS = {
  GHEE10: { type: "percentage", value: 10, maxDiscount: 200 },
  SAVE100: { type: "fixed", value: 100 },
};

const formatPrice = (price) =>
  `৳${Number(price || 0).toLocaleString("en-BD")}`;

const validateBangladeshPhone = (phone) => {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(?:\+?8801|01)[3-9]\d{8}$/.test(cleaned);
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const cartItems = useMemo(() => getCart(), []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    zone: "inside-dhaka",
    district: "Dhaka",
    area: "",
    address: "",
    notes: "",
  });

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!cartItems.length) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.min(
          (subtotal * appliedCoupon.value) / 100,
          appliedCoupon.maxDiscount ?? Infinity
        )
      : Math.min(appliedCoupon.value, subtotal)
    : 0;

  const total = subtotal + DELIVERY_CHARGE - discount;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "zone" && value === "outside-dhaka"
        ? { district: "" }
        : {}),
      ...(name === "zone" && value === "inside-dhaka"
        ? { district: "Dhaka" }
        : {}),
    }));

    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const coupon = COUPONS[code];

    if (!code) {
      setCouponMessage(t("checkout.couponMsg.empty"));
      setAppliedCoupon(null);
      return;
    }

    if (!coupon) {
      setAppliedCoupon(null);
      setCouponMessage(t("checkout.couponMsg.invalid"));
      return;
    }

    setAppliedCoupon({ ...coupon, code });
    setCouponMessage(t("checkout.couponMsg.applied", { code }));
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("checkout.validation.fullName");
    }

    if (!validateBangladeshPhone(formData.phone)) {
      newErrors.phone = t("checkout.validation.phone");
    }

    if (
      formData.alternatePhone &&
      !validateBangladeshPhone(formData.alternatePhone)
    ) {
      newErrors.alternatePhone = t("checkout.validation.alternatePhone");
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = t("checkout.validation.email");
    }

    if (!formData.district.trim()) {
      newErrors.district = t("checkout.validation.district");
    }

    if (!formData.area.trim()) {
      newErrors.area = t("checkout.validation.area");
    }

    if (!formData.address.trim()) {
      newErrors.address = t("checkout.validation.address");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `GH${Date.now().toString().slice(-9)}`;

      const order = {
        orderId,
        createdAt: new Date().toISOString(),
        customer: {
          ...formData,
          phone: formData.phone.trim(),
          alternatePhone: formData.alternatePhone.trim(),
        },
        items: cartItems,
        subtotal,
        deliveryCharge: DELIVERY_CHARGE,
        discount,
        couponCode: appliedCoupon?.code || null,
        total,
        paymentMethod: "Cash on Delivery",
        status: "Pending",
      };

      const existingOrders = JSON.parse(
        localStorage.getItem("gheelagbe-orders") || "[]"
      );

      localStorage.setItem(
        "gheelagbe-orders",
        JSON.stringify([order, ...existingOrders])
      );

      localStorage.setItem(
        "gheelagbe-last-order",
        JSON.stringify(order)
      );

      // Send the order to Google Apps Script.
      // no-cors is used because Apps Script web apps have
      // cross-origin response limitations.
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(order),
        });
      }

      clearCart();

      navigate("/order-success", {
        state: { orderId },
        replace: true,
      });
    } catch (error) {
      console.error("Order submission failed:", error);
      alert(t("checkout.validation.genericError"));
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#242820] outline-none transition focus:border-[#254D32] focus:ring-2 focus:ring-[#254D32]/10 ${
      errors[field] ? "border-red-400" : "border-[#E8E4D9]"
    }`;

  const FieldError = ({ field }) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-[#FFF9EE] pb-20">
      <section className="border-b border-[#E8E4D9] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-[#6F746B]">
            <Link to="/" className="hover:text-[#254D32]">
              {t("checkout.hero.home")}
            </Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-[#254D32]">
              {t("checkout.hero.cart")}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#254D32]">
              {t("checkout.hero.current")}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-[#193B26] sm:text-5xl">
            {t("checkout.hero.title")}
          </h1>
          <p className="mt-3 text-sm text-[#6F746B] sm:text-base">
            {t("checkout.hero.description")}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_390px]">
            <div className="space-y-6">
              {/* Customer information */}
              <section className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F0E8] text-[#254D32]">
                    <User size={21} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#193B26]">
                      {t("checkout.customer.title")}
                    </h2>
                    <p className="text-xs text-[#6F746B]">
                      {t("checkout.customer.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-[#242820]">
                      {t("checkout.customer.fullName")}
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t("checkout.customer.fullNamePlaceholder")}
                      className={inputClass("fullName")}
                    />
                    <FieldError field="fullName" />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#242820]">
                      {t("checkout.customer.phone")}
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("checkout.customer.phonePlaceholder")}
                      type="tel"
                      className={inputClass("phone")}
                    />
                    <FieldError field="phone" />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#242820]">
                      {t("checkout.customer.alternatePhone")}
                    </label>
                    <input
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      placeholder={t("checkout.customer.alternatePhonePlaceholder")}
                      type="tel"
                      className={inputClass("alternatePhone")}
                    />
                    <FieldError field="alternatePhone" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-[#242820]">
                      {t("checkout.customer.email")}
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("checkout.customer.emailPlaceholder")}
                      type="email"
                      className={inputClass("email")}
                    />
                    <FieldError field="email" />
                  </div>
                </div>
              </section>

              {/* Delivery information */}
              <section className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F0E8] text-[#254D32]">
                    <MapPin size={21} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#193B26]">
                      {t("checkout.delivery.title")}
                    </h2>
                    <p className="text-xs text-[#6F746B]">
                      {t("checkout.delivery.subtitle")}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#242820]">
                    {t("checkout.delivery.zone")}
                  </label>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        value: "inside-dhaka",
                        label: t("checkout.delivery.insideDhaka"),
                      },
                      {
                        value: "outside-dhaka",
                        label: t("checkout.delivery.outsideDhaka"),
                      },
                    ].map((zone) => (
                      <label
                        key={zone.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                          formData.zone === zone.value
                            ? "border-[#254D32] bg-[#E8F0E8]"
                            : "border-[#E8E4D9] hover:border-[#254D32]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="zone"
                          value={zone.value}
                          checked={formData.zone === zone.value}
                          onChange={handleChange}
                          className="accent-[#254D32]"
                        />
                        <span className="text-sm font-semibold text-[#193B26]">
                          {zone.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-[#6F746B]">
                    {t("checkout.delivery.rateNote")}
                  </p>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-[#242820]">
                      {t("checkout.delivery.district")}
                    </label>
                    <input
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder={t("checkout.delivery.districtPlaceholder")}
                      readOnly={formData.zone === "inside-dhaka"}
                      className={`${inputClass("district")} ${
                        formData.zone === "inside-dhaka"
                          ? "bg-[#F7F3E9]"
                          : ""
                      }`}
                    />
                    <FieldError field="district" />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#242820]">
                      {t("checkout.delivery.area")}
                    </label>
                    <input
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder={t("checkout.delivery.areaPlaceholder")}
                      className={inputClass("area")}
                    />
                    <FieldError field="area" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-[#242820]">
                      {t("checkout.delivery.address")}
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t("checkout.delivery.addressPlaceholder")}
                      className={`${inputClass("address")} resize-none`}
                    />
                    <FieldError field="address" />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F0E8] text-[#254D32]">
                    <ShieldCheck size={21} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#193B26]">
                      {t("checkout.payment.title")}
                    </h2>
                    <p className="text-xs text-[#6F746B]">
                      {t("checkout.payment.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#254D32] bg-[#E8F0E8] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#254D32]">
                    <Truck size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#193B26]">
                      {t("checkout.payment.codTitle")}
                    </h3>
                    <p className="mt-1 text-xs text-[#6F746B]">
                      {t("checkout.payment.codDesc")}
                    </p>
                  </div>
                  <CheckCircle2 className="text-[#254D32]" />
                </div>
              </section>

              {/* Order notes */}
              <section className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-7">
                <h2 className="text-xl font-bold text-[#193B26]">
                  {t("checkout.notes.title")}
                </h2>
                <p className="mt-1 text-xs text-[#6F746B]">
                  {t("checkout.notes.subtitle")}
                </p>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t("checkout.notes.placeholder")}
                  className={`${inputClass("notes")} resize-none`}
                />
              </section>
            </div>

            {/* Order summary */}
            <aside className="space-y-5 lg:sticky lg:top-28">
              <section className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <ShoppingBag className="text-[#254D32]" size={22} />
                  <h2 className="text-xl font-bold text-[#193B26]">
                    {t("checkout.summary.title")}
                  </h2>
                </div>

                <div className="max-h-72 space-y-4 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F7F3E9]">
                        <img
                          src={item.image}
                          alt={getProductName(item, language)}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#254D32] px-1 text-[10px] font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-[#193B26]">
                          {getProductName(item, language)}
                        </p>
                        <p className="mt-1 text-xs text-[#6F746B]">
                          {language === "bn" && item.weight_bn
                            ? item.weight_bn
                            : item.weight}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-[#254D32]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="mt-6 border-t border-[#E8E4D9] pt-5">
                  <label className="text-sm font-semibold text-[#193B26]">
                    {t("checkout.summary.couponLabel")}
                  </label>

                  <div className="mt-2 flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(event) => setCouponInput(event.target.value)}
                      placeholder={t("checkout.summary.couponPlaceholder")}
                      disabled={Boolean(appliedCoupon)}
                      className="min-w-0 flex-1 rounded-xl border border-[#E8E4D9] px-3 py-3 text-sm uppercase outline-none focus:border-[#254D32] disabled:bg-[#F7F3E9]"
                    />

                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-500"
                      >
                        {t("checkout.summary.remove")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="rounded-xl bg-[#E8F0E8] px-4 text-sm font-bold text-[#254D32] hover:bg-[#dce9dc]"
                      >
                        {t("checkout.summary.apply")}
                      </button>
                    )}
                  </div>

                  {couponMessage && (
                    <p
                      className={`mt-2 text-xs ${
                        appliedCoupon ? "text-green-700" : "text-red-500"
                      }`}
                    >
                      {couponMessage}
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-[#9A9E94]">
                    {t("checkout.summary.demoHint")}
                  </p>
                </div>

                {/* Price breakdown */}
                <div className="mt-6 space-y-3 border-t border-dashed border-[#E8E4D9] pt-5 text-sm">
                  <div className="flex justify-between text-[#6F746B]">
                    <span>{t("checkout.summary.subtotal")}</span>
                    <span className="font-semibold text-[#242820]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#6F746B]">
                    <span>{t("checkout.summary.deliveryCharge")}</span>
                    <span className="font-semibold text-[#242820]">
                      {formatPrice(DELIVERY_CHARGE)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>{t("checkout.summary.discount")}</span>
                      <span className="font-semibold">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-[#E8E4D9] pt-4">
                    <span className="font-bold text-[#193B26]">
                      {t("checkout.summary.totalAmount")}
                    </span>
                    <span className="text-xl font-bold text-[#254D32]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#254D32] px-5 py-4 font-bold text-white transition hover:bg-[#193B26] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? t("checkout.summary.placingOrder")
                    : t("checkout.summary.placeOrder")}
                  {!isSubmitting && <ArrowRight size={19} />}
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-[#6F746B]">
                  {t("checkout.summary.agreement")}
                </p>
              </section>

              <div className="flex gap-3 rounded-2xl border border-[#E8E4D9] bg-white p-4">
                <Package className="shrink-0 text-[#254D32]" size={22} />
                <div>
                  <p className="text-sm font-bold text-[#193B26]">
                    {t("checkout.summary.needHelpTitle")}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#6F746B]">
                    {t("checkout.summary.needHelpDesc")}
                  </p>
                </div>
              </div>

              <Link
                to="/cart"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[#254D32] hover:underline"
              >
                <ArrowLeft size={16} />
                {t("checkout.summary.backToCart")}
              </Link>
            </aside>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;
