"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar, { AdminMobileNav } from "@/components/AdminSidebar";
import { getAdminProducts, getOrders } from "@/lib/storage";
import type { Product, Order } from "@/types";

function Dashboard() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [ordersList, setOrdersList] = useState<Order[]>([]);

  useEffect(() => {
    getAdminProducts().then(setProductsList);
    getOrders().then(setOrdersList);
  }, []);

  const totalProducts = productsList.length;
  const inStockProducts = productsList.filter((p) => p.inStock).length;
  const totalOrders = ordersList.length;
  const totalRevenue = ordersList
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const recentOrders = ordersList.slice(0, 5);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminMobileNav />
        <div className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="font-heading text-3xl text-burgundy font-bold">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-burgundy">{totalProducts}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-500 mb-1">In Stock</p>
              <p className="text-3xl font-bold text-green-600">{inStockProducts}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-burgundy">{totalOrders}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-gold">₹{totalRevenue.toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link href="/admin/products" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-burgundy/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-burgundy/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-burgundy transition-colors">Manage Products</h3>
                  <p className="text-sm text-gray-500">Add, edit, or remove products</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/orders" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-burgundy/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-burgundy transition-colors">View Orders</h3>
                  <p className="text-sm text-gray-500">Track and manage customer orders</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Orders */}
          {recentOrders.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-heading text-lg text-gray-900">Recent Orders</h2>
                <Link href="/admin/orders" className="text-sm text-burgundy hover:underline">View all</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Order ID</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Customer</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Amount</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-mono text-xs text-gray-600">{order.id}</td>
                        <td className="px-6 py-3 font-medium text-gray-800">{order.customerName}</td>
                        <td className="px-6 py-3 text-gold font-semibold">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            { ordered: "bg-yellow-100 text-yellow-700", processing: "bg-blue-100 text-blue-700", shipped: "bg-purple-100 text-purple-700", delivered: "bg-green-100 text-green-700" }[order.status]
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
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

export default function AdminPage() {
  return (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  );
}
