
import { Link, Navigate } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";

const formatPrice = (price) =>
  `৳${Number(price || 0).toLocaleString("en-BD")}`;

const OrderSuccessPage = () => {
  let order = null;

  try {
    order = JSON.parse(
      localStorage.getItem("gheelagbe-last-order") || "null"
    );
  } catch {
    order = null;
  }

  if (!order) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FFF9EE] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-[#E8E4D9] bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F0E8] text-[#254D32]">
            <CheckCircle2 size={42} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#D9A441]">
            Order placed successfully
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#193B26] sm:text-5xl">
            Thank You!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#6F746B]">
            Your order has been received. Our team will call you shortly
            to confirm your order and delivery details.
          </p>

          <div className="mt-8 rounded-2xl bg-[#F7F3E9] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6F746B]">
              Your Order Reference
            </p>
            <p className="mt-2 text-2xl font-bold tracking-wider text-[#254D32]">
              {order.orderId}
            </p>
            <span className="mt-3 inline-flex rounded-full bg-[#F5E7C5] px-4 py-1.5 text-xs font-bold text-[#795A18]">
              {order.status}
            </span>
          </div>

          <div className="mt-8 text-left">
            <h2 className="text-lg font-bold text-[#193B26]">
              Order Summary
            </h2>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F7F3E9]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#193B26]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-[#6F746B]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-[#254D32]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#E8E4D9] pt-5 text-sm">
              <div className="flex justify-between text-[#6F746B]">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>

              <div className="flex justify-between text-[#6F746B]">
                <span>Delivery Charge</span>
                <span>{formatPrice(order.deliveryCharge)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-[#E8E4D9] pt-4">
                <span className="font-bold text-[#193B26]">
                  Total Paid on Delivery
                </span>
                <span className="text-xl font-bold text-[#254D32]">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4 rounded-2xl border border-[#E8E4D9] p-5 text-left">
            <div className="flex gap-3">
              <Phone className="shrink-0 text-[#254D32]" size={20} />
              <div>
                <p className="text-sm font-bold text-[#193B26]">
                  Order Confirmation
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#6F746B]">
                  We will call {order.customer.phone} to confirm your order.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Truck className="shrink-0 text-[#254D32]" size={20} />
              <div>
                <p className="text-sm font-bold text-[#193B26]">
                  Delivery Address
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#6F746B]">
                  {order.customer.address}, {order.customer.area},{" "}
                  {order.customer.district}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Package className="shrink-0 text-[#254D32]" size={20} />
              <div>
                <p className="text-sm font-bold text-[#193B26]">
                  Payment Method
                </p>
                <p className="mt-1 text-xs text-[#6F746B]">
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/products"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#254D32] px-6 py-4 font-bold text-white transition hover:bg-[#193B26]"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
