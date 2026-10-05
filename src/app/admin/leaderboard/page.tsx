"use client";

import { useState, useEffect, useMemo } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar, { AdminMobileNav } from "@/components/AdminSidebar";
import { getOrders } from "@/lib/storage";
import type { Order } from "@/types";

type TimePeriod = "daily" | "weekly" | "monthly" | "quarterly" | "half-yearly" | "yearly" | "beyond";

const timePeriods: { key: TimePeriod; label: string }[] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "half-yearly", label: "Half Yearly" },
  { key: "yearly", label: "Yearly" },
  { key: "beyond", label: "Beyond" },
];

function getStartDate(period: TimePeriod): Date | null {
  const now = new Date();
  switch (period) {
    case "daily":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "weekly": {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      return d;
    }
    case "monthly": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 1);
      return d;
    }
    case "quarterly": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 3);
      return d;
    }
    case "half-yearly": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 6);
      return d;
    }
    case "yearly": {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return d;
    }
    case "beyond":
      return null;
  }
}

interface CustomerRank {
  name: string;
  phone: string;
  totalItems: number;
  totalRevenue: number;
  orderCount: number;
}

function LeaderboardContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [period, setPeriod] = useState<TimePeriod>("monthly");
  const [sortBy, setSortBy] = useState<"items" | "revenue">("revenue");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const rankings = useMemo(() => {
    const startDate = getStartDate(period);
    const filtered = startDate
      ? orders.filter((o) => new Date(o.createdAt) >= startDate)
      : orders;

    const customerMap = new Map<string, CustomerRank>();

    for (const order of filtered) {
      const key = order.customerPhone || order.customerName;
      const existing = customerMap.get(key);
      const itemCount = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);

      if (existing) {
        existing.totalItems += itemCount;
        existing.totalRevenue += order.totalAmount;
        existing.orderCount += 1;
        if (!existing.name && order.customerName) existing.name = order.customerName;
      } else {
        customerMap.set(key, {
          name: order.customerName || "Unknown",
          phone: order.customerPhone || "",
          totalItems: itemCount,
          totalRevenue: order.totalAmount,
          orderCount: 1,
        });
      }
    }

    const list = Array.from(customerMap.values());
    list.sort((a, b) =>
      sortBy === "revenue"
        ? b.totalRevenue - a.totalRevenue
        : b.totalItems - a.totalItems
    );
    return list;
  }, [orders, period, sortBy]);

  const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-700"];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminMobileNav />
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <h1 className="font-heading text-3xl text-burgundy font-bold">Leaderboard</h1>
            <p className="text-gray-500 text-sm mt-1">Top customers ranked by purchase activity</p>
          </div>

          {/* Timeline Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {timePeriods.map((tp) => (
              <button
                key={tp.key}
                onClick={() => setPeriod(tp.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  period === tp.key
                    ? "bg-burgundy text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-burgundy/40 hover:text-burgundy"
                }`}
              >
                {tp.label}
              </button>
            ))}
          </div>

          {/* Sort Toggle */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-500">Sort by:</span>
            <button
              onClick={() => setSortBy("revenue")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "revenue"
                  ? "bg-gold/20 text-gold-dark border border-gold/40"
                  : "bg-white text-gray-500 border border-gray-200 hover:text-gray-700"
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setSortBy("items")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "items"
                  ? "bg-gold/20 text-gold-dark border border-gold/40"
                  : "bg-white text-gray-500 border border-gray-200 hover:text-gray-700"
              }`}
            >
              Items Bought
            </button>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-burgundy mx-auto mb-4" />
              <p className="text-gray-500">Loading leaderboard...</p>
            </div>
          ) : rankings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="font-heading text-xl text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500 text-sm">No orders in the selected time period.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 p-5 border-b border-gray-100 bg-gray-50/50">
                <div className="text-center">
                  <p className="text-2xl font-bold text-burgundy">{rankings.length}</p>
                  <p className="text-xs text-gray-500">Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-burgundy">
                    {rankings.reduce((s, r) => s + r.totalItems, 0)}
                  </p>
                  <p className="text-xs text-gray-500">Items Sold</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gold">
                    ₹{rankings.reduce((s, r) => s + r.totalRevenue, 0).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-500">Total Revenue</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium w-12">#</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Customer</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Phone</th>
                      <th className="text-right px-6 py-3 text-gray-500 font-medium">Orders</th>
                      <th className="text-right px-6 py-3 text-gray-500 font-medium">Items Bought</th>
                      <th className="text-right px-6 py-3 text-gray-500 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rankings.map((customer, idx) => (
                      <tr key={customer.phone || customer.name} className="hover:bg-gray-50">
                        <td className="px-6 py-3">
                          {idx < 3 ? (
                            <span className={`text-lg font-bold ${medalColors[idx]}`}>
                              {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                            </span>
                          ) : (
                            <span className="text-gray-400 font-medium">{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-6 py-3 font-medium text-gray-800">{customer.name}</td>
                        <td className="px-6 py-3 text-gray-500 font-mono text-xs">{customer.phone || "—"}</td>
                        <td className="px-6 py-3 text-right text-gray-600">{customer.orderCount}</td>
                        <td className="px-6 py-3 text-right">
                          <span className={`font-semibold ${sortBy === "items" ? "text-burgundy" : "text-gray-700"}`}>
                            {customer.totalItems}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <span className={`font-semibold ${sortBy === "revenue" ? "text-gold" : "text-gray-700"}`}>
                            ₹{customer.totalRevenue.toLocaleString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <AdminGuard>
      <LeaderboardContent />
    </AdminGuard>
  );
}
