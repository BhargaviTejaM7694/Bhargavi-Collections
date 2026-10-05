"use client";

import { useState } from "react";
import Link from "next/link";

interface OrderResult {
  id: string;
  customerName: string;
  items: { name: string; price: number; quantity: number }[];
  totalAmount: number;
  status: "ordered" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  ordered: { label: "Ordered", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: "📋" },
  processing: { label: "Processing", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: "⚙️" },
  shipped: { label: "Shipped", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", icon: "🚚" },
  delivered: { label: "Delivered", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: "✅" },
};

export default function OrderStatusPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<OrderResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrders(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setOrders(data.orders);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Order Status</span>
      </nav>

      <h1 className="section-title">Track Your Order</h1>

      {/* Phone lookup form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
        <p className="text-gray-600 text-sm mb-4">
          Enter the phone number you used while placing your order to view its status.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-burgundy text-white hover:bg-burgundy-dark"
            }`}
          >
            {loading ? "Searching..." : "Track Order"}
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {orders !== null && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-cream rounded-xl">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-heading text-xl text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500 text-sm mb-4">
                We couldn&apos;t find any orders with this phone number.
              </p>
              <Link href="/order" className="text-burgundy font-medium hover:underline text-sm">
                Place a new order →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Found <strong>{orders.length}</strong> order{orders.length > 1 ? "s" : ""} for this phone number
              </p>

              {orders.map((order) => {
                const status = statusConfig[order.status] || statusConfig.ordered;
                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Order header */}
                    <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                        <p className="font-mono font-semibold text-gray-800">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-0.5">Placed on</p>
                        <p className="text-sm text-gray-700">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="px-5 py-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${status.bg} ${status.color}`}>
                        <span>{status.icon}</span>
                        {status.label}
                      </div>
                    </div>

                    {/* Status timeline */}
                    <div className="px-5 pb-3">
                      <div className="flex items-center gap-1">
                        {["ordered", "processing", "shipped", "delivered"].map((step, i) => {
                          const stepOrder = ["ordered", "processing", "shipped", "delivered"];
                          const currentIdx = stepOrder.indexOf(order.status);
                          const active = i <= currentIdx;
                          return (
                            <div key={step} className="flex items-center flex-1">
                              <div
                                className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                  active ? "bg-burgundy" : "bg-gray-200"
                                }`}
                              />
                              {i < 3 && (
                                <div
                                  className={`flex-1 h-1 ${
                                    i < currentIdx ? "bg-burgundy" : "bg-gray-200"
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-1">
                        {["Ordered", "Processing", "Shipped", "Delivered"].map((label) => (
                          <span key={label} className="text-[10px] text-gray-400">{label}</span>
                        ))}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="px-5 py-3 border-t border-gray-100">
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">
                              {item.name}
                              {item.quantity > 1 && (
                                <span className="text-gray-400 ml-1">x{item.quantity}</span>
                              )}
                            </span>
                            <span className="text-gray-600 font-medium">
                              ₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="px-5 py-3 bg-cream/50 border-t border-gray-100 flex justify-between items-center">
                      <span className="font-medium text-gray-800">Total</span>
                      <span className="font-bold text-burgundy text-lg">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
