
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
      setCouponMessage("Please enter a coupon code.");
      setAppliedCoupon(null);
      return;
    }

    if (!coupon) {
      setAppliedCoupon(null);
      setCouponMessage("Invalid coupon code.");
      return;
    }

    setAppliedCoupon({ ...coupon, code });
    setCouponMessage(`Coupon ${code} applied successfully!`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!validateBangladeshPhone(formData.phone)) {
      newErrors.phone = "Enter a valid Bangladesh mobile number.";
    }

    if (
      formData.alternatePhone &&
      !validateBangladeshPhone(formData.alternatePhone)
    ) {
      newErrors.alternatePhone = "Enter a valid alternate phone number.";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.district.trim()) {
      newErrors.district = "Please enter your district.";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Please enter your area or thana.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your full delivery address.";
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
      alert("Something went wrong. Please try again.");
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
            <Link to="/" className="hover:text-[#254D32]">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-[#254D32]">Cart</Link>
            <span>/</span>
            <span className="font-semibold text-[#254D32]">Checkout</span>
          </div>

          <h1 className="text-4xl font-bold text-[#193B26] sm:text-5xl">
            Complete Your Order
          </h1>
          <p className="mt-3 text-sm text-[#6F746B] sm:text-base">
            Just a few details and your favorite products will be on their way.
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
                      Customer Information
                    </h2>
                    <p className="text-xs text-[#6F746B]">
                      Enter your contact details
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-[#242820]">
                      Full Name *
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass("fullName")}
                    />
                    <FieldError field="fullName" />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#242820]">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      type="tel"
                      className={inputClass("phone")}
                    />
                    <FieldError field="phone" />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#242820]">
                      Alternate Phone
                    </label>
                    <input
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      placeholder="Optional"
                      type="tel"
                      className={inputClass("alternatePhone")}
                    />
                    <FieldError field="alternatePhone" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-[#242820]">
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com (optional)"
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
                      Delivery Address
                    </h2>
                    <p className="text-xs text-[#6F746B]">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#242820]">
                    Delivery Zone *
                  </label>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "inside-dhaka", label: "Inside Dhaka" },
                      { value: "outside-dhaka", label: "Outside Dhaka" },
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
                    Delivery charge: ৳120 for both zones.
                  </p>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-[#242820]">
                      District *
                    </label>
                    <input
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Enter district"
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
                      Area / Thana *
                    </label>
                    <input
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="e.g. Mirpur, Dhanmondi"
                      className={inputClass("area")}
                    />
                    <FieldError field="area" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-[#242820]">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={4}
                      placeholder="House number, road, village, landmark..."
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
                      Payment Method
                    </h2>
                    <p className="text-xs text-[#6F746B]">
                      Available payment option
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[#254D32] bg-[#E8F0E8] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#254D32]">
                    <Truck size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#193B26]">
                      Cash on Delivery
                    </h3>
                    <p className="mt-1 text-xs text-[#6F746B]">
                      Pay when your order arrives.
                    </p>
                  </div>
                  <CheckCircle2 className="text-[#254D32]" />
                </div>
              </section>

              {/* Order notes */}
              <section className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-7">
                <h2 className="text-xl font-bold text-[#193B26]">
                  Additional Notes
                </h2>
                <p className="mt-1 text-xs text-[#6F746B]">
                  Any special instructions for your delivery?
                </p>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Optional order notes..."
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
                    Your Order
                  </h2>
                </div>

                <div className="max-h-72 space-y-4 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F7F3E9]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#254D32] px-1 text-[10px] font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-[#193B26]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-[#6F746B]">
                          {item.weight}
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
                    Coupon Code
                  </label>

                  <div className="mt-2 flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(event) => setCouponInput(event.target.value)}
                      placeholder="Enter coupon"
                      disabled={Boolean(appliedCoupon)}
                      className="min-w-0 flex-1 rounded-xl border border-[#E8E4D9] px-3 py-3 text-sm uppercase outline-none focus:border-[#254D32] disabled:bg-[#F7F3E9]"
                    />

                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-500"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="rounded-xl bg-[#E8F0E8] px-4 text-sm font-bold text-[#254D32] hover:bg-[#dce9dc]"
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  {couponMessage && (
                    <p className={`mt-2 text-xs ${
                      appliedCoupon ? "text-green-700" : "text-red-500"
                    }`}>
                      {couponMessage}
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-[#9A9E94]">
                    Demo codes: GHEE10 or SAVE100
                  </p>
                </div>

                {/* Price breakdown */}
                <div className="mt-6 space-y-3 border-t border-dashed border-[#E8E4D9] pt-5 text-sm">
                  <div className="flex justify-between text-[#6F746B]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#242820]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#6F746B]">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-[#242820]">
                      {formatPrice(DELIVERY_CHARGE)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span className="font-semibold">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-[#E8E4D9] pt-4">
                    <span className="font-bold text-[#193B26]">
                      Total Amount
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
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                  {!isSubmitting && <ArrowRight size={19} />}
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-[#6F746B]">
                  By placing your order, you agree to our order and delivery
                  process. Our team will call you to confirm your order.
                </p>
              </section>

              <div className="flex gap-3 rounded-2xl border border-[#E8E4D9] bg-white p-4">
                <Package className="shrink-0 text-[#254D32]" size={22} />
                <div>
                  <p className="text-sm font-bold text-[#193B26]">
                    Need help?
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#6F746B]">
                    Our team will contact you by phone to confirm your order.
                  </p>
                </div>
              </div>

              <Link
                to="/cart"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[#254D32] hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Cart
              </Link>
            </aside>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;
