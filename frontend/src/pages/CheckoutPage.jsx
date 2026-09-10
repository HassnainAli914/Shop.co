import React, { useState } from "react";
import BreadcrumbCollapsed from "../components/Breadcrupm";
import { Button } from "../components/ui/button";
import { CheckCircle2, ShieldCheck, Truck, CreditCard } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function CheckoutPage({
  cart = [],
  user,
  onClearCart,
  onNavigate,
}) {
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "United States",
    pinCode: "",
    paymentMethod: "Card",
    cardNumber: "************",
    expDate: "12/29",
    cvv: "***",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity || item.qty) || 1;
    return acc + price * qty;
  }, 0);

  const discount = subtotal * 0.2;
  const delivery = cart.length > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - discount + delivery);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address || !formData.city) {
      setError("Please fill in all required fields (Name, Email, Address, City).");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    const orderId = String(Math.floor(790000 + Math.random() * 10000));
    const orderPayload = {
      id: orderId,
      orderNumber: `#${orderId}`,
      customerName: formData.fullName,
      userName: formData.email.split("@")[0],
      email: formData.email,
      phone: formData.phone || "+1 555000000",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      branch: formData.country || "USA",
      paymentType: formData.paymentMethod,
      quantity: cart.reduce((sum, i) => sum + (Number(i.quantity || i.qty) || 1), 0),
      orderDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Pending",
      subtotal: subtotal,
      shippingFee: delivery,
      tax: 0,
      total: total,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      pinCode: formData.pinCode,
      state: formData.state,
      cardNumber: formData.cardNumber,
      expDate: formData.expDate,
      cvv: formData.cvv,
      notes: formData.notes,
      items: cart.map((item) => ({
        id: item.id || item.productId,
        name: item.name,
        sku: item.id || "SKU-ITEM",
        price: Number(item.price),
        unitPrice: Number(item.price),
        quantity: Number(item.quantity || item.qty) || 1,
        total: (Number(item.price) || 0) * (Number(item.quantity || item.qty) || 1),
        image: item.image,
        size: item.size,
        color: item.color,
      })),
      activity: [
        {
          date: "Today",
          events: [
            {
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              title: "Order Placed Successfully",
              subtitle: "We are preparing your items",
              isBlue: true,
            },
          ],
        },
      ],
    };

    try {
      const res = await fetch(`${API}/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        console.warn("Backend order API request returned status:", res.status);
      }
    } catch (err) {
      console.warn("Network issue connecting to orders backend:", err.message);
    } finally {
      setLoading(false);
      if (onClearCart) onClearCart();
      if (onNavigate) onNavigate("orders");
    }
  };

  return (
    <div className="mt-24 md:mt-28 lg:mt-32 max-w-screen-xl mx-auto px-4 pb-16">
      <BreadcrumbCollapsed current="Checkout" onNavigate={onNavigate} />

      <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-6 tracking-tight">
        CHECKOUT & ORDER DETAILS
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Form Fields */}
          <div className="w-full lg:w-[65%] space-y-6">
            {/* Customer Information Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 sm:p-8 space-y-5 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                1. Customer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 123 4567"
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 sm:p-8 space-y-5 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                2. Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pin / Zip Code
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 sm:p-8 space-y-5 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                3. Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Card", "Cash on Delivery", "UPI"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition ${
                      formData.paymentMethod === method
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    {method}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === "Card" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="**** **** **** ****"
                      className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="***"
                      maxLength={4}
                      className="w-full bg-[#F0F0F0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Action */}
          <div className="w-full lg:w-[35%] bg-white border border-gray-200 rounded-[24px] p-6 space-y-6 shadow-sm sticky top-28">
            <h2 className="text-xl font-extrabold text-black">Order Summary</h2>

            {/* Item Previews */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image || "/images/might1.png"}
                      alt={item.name}
                      className="w-10 h-10 object-contain rounded-lg bg-gray-50 border"
                    />
                    <div>
                      <p className="font-bold text-gray-900 truncate max-w-[140px]">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity || 1} &bull; {item.size || "M"}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">
                    ${((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
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
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-extrabold text-black">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black text-white py-6 text-sm font-semibold hover:bg-gray-800 shadow-md transition"
            >
              {loading ? "Placing Order..." : `Confirm & Place Order ($${total.toFixed(2)})`}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
