"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Admin Login</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-heading text-2xl text-gray-900 font-bold">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage your store</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Admin dashboard coming soon!");
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bhargavicollections.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-burgundy text-white py-3 rounded-md font-medium hover:bg-burgundy-dark transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Contact support if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}
