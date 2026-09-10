import React, { useState, useEffect } from "react";
import BreadcrumbCollapsed from "../components/Breadcrupm";
import { Button } from "../components/ui/button";
import { Package, Clock, CheckCircle, Truck, XCircle, ChevronRight, RefreshCw } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function MyOrdersPage({ user, onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // If logged in, prioritize user orders, else show all
          setOrders(data);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch orders from backend:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "complete":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case "processing":
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case "cancel":
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            {status || "Pending"}
          </span>
        );
    }
  };

  return (
    <div className="mt-24 md:mt-28 lg:mt-32 max-w-screen-xl mx-auto px-4 pb-20">
      <BreadcrumbCollapsed current="My Orders" onNavigate={onNavigate} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            MY ORDERS & STATUSES
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track real-time delivery status and purchase history
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchOrders}
            variant="outline"
            className="rounded-full flex items-center gap-2 border-gray-300 text-xs font-semibold px-4 py-2 hover:bg-gray-100"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            onClick={() => onNavigate("casual")}
            className="rounded-full bg-black text-white px-6 py-2 text-xs font-semibold hover:bg-gray-800"
          >
            Continue Shopping
          </Button>
        </div>
      </div>

      {loading && orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <RefreshCw className="w-8 h-8 mx-auto animate-spin text-gray-400 mb-3" />
          <p className="text-sm font-semibold text-gray-600">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 p-8 max-w-xl mx-auto">
          <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders placed yet</h2>
          <p className="text-sm text-gray-500 mb-6">
            When you complete checkout, your order updates and delivery tracker will appear here.
          </p>
          <Button
            onClick={() => onNavigate("casual")}
            className="rounded-full bg-black text-white px-8 py-5 text-sm font-semibold hover:bg-gray-800"
          >
            Explore Collections
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const rawItems = Array.isArray(order.items) ? order.items : [];

            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-[24px] p-6 sm:p-8 shadow-sm hover:border-gray-300 transition space-y-6"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
                        {order.order_number || order.orderNumber || `#${order.id}`}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-xs text-gray-500">
                      Placed on <span className="font-semibold text-gray-800">{order.order_date || order.orderDate || "Recent"}</span> &bull; Payment: <span className="font-semibold text-gray-800">{order.payment_type || order.paymentType || "Card"}</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-xl font-extrabold text-black">
                      ${Number(order.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="py-2">
                  <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-gray-600 mb-2">
                    <span className="text-green-600 font-bold">1. Order Placed</span>
                    <span className={order.status !== "Pending" ? "text-green-600 font-bold" : "text-gray-400"}>
                      2. Processing
                    </span>
                    <span className={order.status === "Delivered" || order.status === "Complete" ? "text-green-600 font-bold" : "text-gray-400"}>
                      3. Dispatched
                    </span>
                    <span className={order.status === "Delivered" || order.status === "Complete" ? "text-green-600 font-bold" : "text-gray-400"}>
                      4. Delivered
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full transition-all duration-500 rounded-full"
                      style={{
                        width:
                          order.status === "Delivered" || order.status === "Complete"
                            ? "100%"
                            : order.status === "Processing" || order.status === "Shipped"
                            ? "66%"
                            : "33%",
                      }}
                    />
                  </div>
                </div>

                {/* Ordered Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {rawItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80"}
                        alt={item.name}
                        className="w-14 h-14 object-contain rounded-xl bg-white p-1 border"
                      />
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Qty: {item.quantity || 1} &bull; ${(Number(item.price || item.unitPrice || 0)).toFixed(2)} each
                        </p>
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-black">
                        ${(Number(item.total || (item.price * (item.quantity || 1)) || 0)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Shipping & Delivery Footer */}
                <div className="bg-[#FAF9F8] rounded-2xl p-4 text-xs flex flex-col sm:flex-row justify-between gap-3 text-gray-600">
                  <div>
                    <span className="font-bold text-gray-800">Ship to: </span>
                    {order.customer_name || order.customerName} &bull; {order.address || "123 Main Street"}, {order.city || "New York"} {order.pin_code || ""}
                  </div>
                  <div>
                    <span className="font-bold text-gray-800">Contact: </span>
                    {order.email} {order.phone ? `(${order.phone})` : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
