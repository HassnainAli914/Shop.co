import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { MdDelete } from "react-icons/md";
import BreadcrumbCollapsed from "../components/Breadcrupm";
import { Button } from "../components/ui/button";

export default function CartPage({
  cart = [],
  onUpdateQty,
  onRemoveItem,
  onNavigate,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity || item.qty) || 1;
    return acc + price * qty;
  }, 0);

  const discount = promoApplied ? subtotal * 0.2 : subtotal * 0.2;
  const delivery = cart.length > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - discount + delivery);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  return (
    <div className="mt-24 md:mt-28 lg:mt-32 max-w-screen-2xl mx-auto px-4">
      <BreadcrumbCollapsed current="Cart" onNavigate={onNavigate} />

      <h1 className="text-3xl sm:text-4xl font-extrabold max-w-screen-xl mx-auto mt-4 mb-6 tracking-tight">
        YOUR CART
      </h1>

      {cart.length === 0 ? (
        <div className="max-w-screen-xl mx-auto text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is currently empty
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Looks like you haven't added any fashion items yet.
          </p>
          <Button
            onClick={() => onNavigate && onNavigate("casual")}
            className="rounded-full bg-black text-white px-8 py-6 text-sm font-semibold hover:bg-gray-800 transition"
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="w-full lg:w-[62%] bg-white border border-gray-200 rounded-[24px] p-4 sm:p-6 space-y-6 shadow-sm">
            {cart.map((item, index) => {
              const itemPrice = Number(item.price) || 0;
              const itemQty = Number(item.quantity || item.qty) || 1;

              return (
                <div
                  key={item.id || item.productId || index}
                  className={`flex justify-between items-center gap-4 pb-6 ${
                    index !== cart.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] bg-[#F0EEED] rounded-2xl flex items-center justify-center p-2 shrink-0">
                      <img
                        src={item.image || `/images/might${(index % 4) + 1}.png`}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-xl"
                        onError={(e) => {
                          e.target.src = `/images/might${(index % 4) + 1}.png`;
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Size: <span className="text-gray-800 font-medium">{item.size || "Large"}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Color: <span className="text-gray-800 font-medium">{item.color || "Black"}</span>
                      </p>
                      <p className="font-extrabold text-base sm:text-lg text-black pt-1">
                        ${itemPrice * itemQty}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end h-[80px] sm:h-[100px]">
                    <button
                      onClick={() => onRemoveItem && onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      title="Remove item"
                    >
                      <MdDelete className="text-xl sm:text-2xl" />
                    </button>

                    <div className="flex items-center bg-[#F0F0F0] rounded-full px-3 py-1.5 gap-3">
                      <button
                        onClick={() =>
                          onUpdateQty &&
                          onUpdateQty(item.id, Math.max(1, itemQty - 1))
                        }
                        className="text-gray-700 hover:text-black font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs sm:text-sm font-bold min-w-[14px] text-center">
                        {itemQty}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQty &&
                          onUpdateQty(item.id, itemQty + 1)
                        }
                        className="text-gray-700 hover:text-black font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full lg:w-[35%] bg-white border border-gray-200 rounded-[24px] p-6 space-y-5 shadow-sm sticky top-28">
            <h2 className="text-xl font-extrabold text-black">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount (-20%)</span>
                <span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-black">${delivery.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-base sm:text-lg font-extrabold text-black">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Add promo code"
                className="bg-[#F0F0F0] rounded-full px-4 py-2.5 text-xs sm:text-sm w-full outline-none"
              />
              <Button
                onClick={handleApplyPromo}
                className="rounded-full bg-black text-white px-5 py-2 text-xs font-semibold hover:bg-gray-800"
              >
                Apply
              </Button>
            </div>

            <Button
              onClick={() => alert(`Proceeding to checkout with Total: $${total.toFixed(2)}`)}
              className="w-full rounded-full bg-black text-white py-6 text-sm font-semibold hover:bg-gray-800 shadow-md transition"
            >
              Go to Checkout →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
