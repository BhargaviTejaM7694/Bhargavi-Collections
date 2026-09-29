"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar, { AdminMobileNav } from "@/components/AdminSidebar";
import { getOrders, updateOrderStatus, getAdminProducts } from "@/lib/storage";
import type { Order, Product } from "@/types";

type Timeline = "all" | "today" | "weekly" | "monthly" | "quarterly" | "yearly";

function filterByTimeline(orders: Order[], timeline: Timeline): Order[] {
  if (timeline === "all") return orders;
  const now = new Date();
  const start = new Date();

  switch (timeline) {
    case "today":
      start.setHours(0, 0, 0, 0);
      break;
    case "weekly":
      start.setDate(now.getDate() - 7);
      break;
    case "monthly":
      start.setMonth(now.getMonth() - 1);
      break;
    case "quarterly":
      start.setMonth(now.getMonth() - 3);
      break;
    case "yearly":
      start.setFullYear(now.getFullYear() - 1);
      break;
  }

  return orders.filter((o) => new Date(o.createdAt) >= start);
}

const statusColors: Record<Order["status"], string> = {
  ordered: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const statusLabels: Record<Order["status"], string> = {
  ordered: "Ordered",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

const allStatuses: Order["status"][] = ["ordered", "processing", "shipped", "delivered"];

function OrderItemRow({ item, productMap }: { item: Order["items"][number]; productMap: Map<string, Product> }) {
  const imageUrl = item.image || productMap.get(item.id)?.image;
  const qty = item.quantity || 1;

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 p-2.5">
      <Link href={`/products/${item.id}`} className="flex-shrink-0">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={item.name}
            className="w-14 h-14 rounded-lg object-cover border border-gray-200 hover:border-gold transition-colors"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-cream flex items-center justify-center border border-gray-200">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.id}`}
          className="text-sm font-medium text-gray-800 hover:text-burgundy transition-colors block truncate"
        >
          {item.name}
        </Link>
        {qty > 1 && (
          <p className="text-xs text-gray-500">Qty: {qty}</p>
        )}
      </div>
      <span className="text-sm text-gold font-semibold whitespace-nowrap">
        ₹{(item.price * qty).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

function OrdersManagement() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [timeline, setTimeline] = useState<Timeline>("all");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ orderId: string; message: string; type: "success" | "error" } | null>(null);
  const [productMap, setProductMap] = useState<Map<string, Product>>(new Map());

  useEffect(() => {
    setOrdersList(getOrders());
    const products = getAdminProducts();
    const map = new Map<string, Product>();
    products.forEach((p) => map.set(p.id, p));
    setProductMap(map);
  }, []);

  const timelineFiltered = filterByTimeline(ordersList, timeline);
  const filtered = statusFilter === "all" ? timelineFiltered : timelineFiltered.filter((o) => o.status === statusFilter);

  const totalRevenue = filtered.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleStatusChange = async (order: Order, newStatus: Order["status"]) => {
    if (newStatus === order.status) return;

    setUpdatingStatus(order.id);
    setStatusMessage(null);

    updateOrderStatus(order.id, newStatus);
    setOrdersList(getOrders());

    try {
      const res = await fetch("/api/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          orderId: order.id,
          items: order.items,
          totalAmount: order.totalAmount,
          newStatus,
        }),
      });
      const result = await res.json();

      if (result.emailSent) {
        setStatusMessage({ orderId: order.id, message: `Email sent to ${order.customerEmail}`, type: "success" });
      } else {
        setStatusMessage({ orderId: order.id, message: "Status updated (email not configured)", type: "success" });
      }
    } catch {
      setStatusMessage({ orderId: order.id, message: "Status updated but email failed", type: "error" });
    } finally {
      setUpdatingStatus(null);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const timelines: { key: Timeline; label: string }[] = [
    { key: "all", label: "All" },
    { key: "today", label: "Today" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
    { key: "quarterly", label: "Quarterly" },
    { key: "yearly", label: "Yearly" },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminMobileNav />
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <h1 className="font-heading text-3xl text-burgundy font-bold">Orders</h1>
            <p className="text-gray-500 text-sm mt-1">{filtered.length} orders &middot; ₹{totalRevenue.toLocaleString("en-IN")} revenue</p>
          </div>

          {/* Timeline Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {timelines.map((t) => (
              <button
                key={t.key}
                onClick={() => setTimeline(t.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  timeline === t.key
                    ? "bg-burgundy text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {([["all", "All"], ["ordered", "Ordered"], ["processing", "Processing"], ["shipped", "Shipped"], ["delivered", "Delivered"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === key
                    ? key === "all" ? "bg-burgundy text-white"
                    : key === "ordered" ? "bg-yellow-500 text-white"
                    : key === "processing" ? "bg-blue-500 text-white"
                    : key === "shipped" ? "bg-purple-500 text-white"
                    : "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
                {key !== "all" && (
                  <span className="ml-1.5 text-xs opacity-80">
                    {timelineFiltered.filter((o) => o.status === key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <p className="text-gray-400 text-lg">No orders found for this period</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((order) => (
                      <React.Fragment key={order.id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono text-gray-600">{order.id}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-800">{order.customerName}</p>
                            <p className="text-xs text-gray-500">{order.customerPhone}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {order.items.length} item{order.items.length > 1 ? "s" : ""}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gold text-right">
                            ₹{order.totalAmount.toLocaleString("en-IN")}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="relative inline-block">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order, e.target.value as Order["status"])}
                                disabled={updatingStatus === order.id}
                                className={`appearance-none pl-3 pr-7 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-burgundy/30 ${statusColors[order.status]} ${updatingStatus === order.id ? "opacity-50" : ""}`}
                              >
                                {allStatuses.map((s) => (
                                  <option key={s} value={s}>{statusLabels[s]}</option>
                                ))}
                              </select>
                              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                            {statusMessage?.orderId === order.id && (
                              <p className={`text-xs mt-1 ${statusMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                                {statusMessage.message}
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                              className="text-burgundy hover:text-burgundy-dark text-sm font-medium transition-colors"
                            >
                              {expandedOrder === order.id ? "Hide" : "View"}
                            </button>
                          </td>
                        </tr>
                        {expandedOrder === order.id && (
                          <tr>
                            <td colSpan={7} className="px-6 pb-6 pt-2 bg-gray-50">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Customer Details</h3>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-500">Name:</span> <span className="text-gray-800 font-medium">{order.customerName}</span></p>
                                    <p><span className="text-gray-500">Email:</span> <span className="text-gray-800">{order.customerEmail}</span></p>
                                    <p><span className="text-gray-500">Phone:</span> <span className="text-gray-800">+91 {order.customerPhone}</span></p>
                                    <p><span className="text-gray-500">Address:</span> <span className="text-gray-800">{order.addressLine1}{order.addressLine2 ? `, ${order.addressLine2}` : ""}, {order.city}, {order.state} - {order.pincode}</span></p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Items Ordered</h3>
                                  <div className="space-y-2">
                                    {order.items.map((item, i) => (
                                      <OrderItemRow key={i} item={item} productMap={productMap} />
                                    ))}
                                    <div className="border-t border-gray-200 pt-2 flex items-center justify-between font-semibold">
                                      <span className="text-gray-800">Total</span>
                                      <span className="text-gold">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {order.paymentScreenshotUrl && order.paymentScreenshotUrl !== "attached-in-email" && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment Screenshot</h3>
                                  <a href={order.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-burgundy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-burgundy-dark transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    View Payment Screenshot
                                  </a>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {filtered.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs text-gray-500">{order.id}</p>
                        <p className="font-medium text-gray-800">{order.customerName}</p>
                        <p className="text-gold font-semibold text-sm mt-1">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                        <span className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
                      </div>
                    </button>

                    {expandedOrder === order.id && (
                      <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-4">
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-500">Email:</span> <span className="text-gray-800">{order.customerEmail}</span></p>
                          <p><span className="text-gray-500">Phone:</span> <span className="text-gray-800">+91 {order.customerPhone}</span></p>
                          <p><span className="text-gray-500">Address:</span> <span className="text-gray-800">{order.addressLine1}{order.addressLine2 ? `, ${order.addressLine2}` : ""}, {order.city}, {order.state} - {order.pincode}</span></p>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <OrderItemRow key={i} item={item} productMap={productMap} />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                          <label className="text-sm font-medium text-gray-600">Status:</label>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order, e.target.value as Order["status"])}
                            disabled={updatingStatus === order.id}
                            className={`px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 bg-white ${updatingStatus === order.id ? "opacity-50" : ""}`}
                          >
                            {allStatuses.map((s) => (
                              <option key={s} value={s}>{statusLabels[s]}</option>
                            ))}
                          </select>
                          {updatingStatus === order.id && <span className="text-xs text-gray-400">Sending email...</span>}
                        </div>
                        {statusMessage?.orderId === order.id && (
                          <p className={`text-xs ${statusMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                            {statusMessage.message}
                          </p>
                        )}
                        {order.paymentScreenshotUrl && order.paymentScreenshotUrl !== "attached-in-email" && (
                          <a href={order.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-burgundy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-burgundy-dark transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            View Payment Screenshot
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <AdminGuard>
      <OrdersManagement />
    </AdminGuard>
  );
}
