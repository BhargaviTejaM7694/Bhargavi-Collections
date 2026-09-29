import { Suspense } from "react";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Place Order",
  description: "Order 1 gram gold imitation jewellery online from Bhargavi Teja Collections, Hanuman Junction near Vijayawada. Free delivery across Andhra Pradesh. Necklaces, earrings, bangles & more.",
};

export default function OrderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Place Order</span>
      </nav>

      <h1 className="section-title">Place Your Order</h1>
      <p className="text-center text-gray-600 mb-8">Fill in your details below. All fields marked with * are required.</p>

      <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
        <OrderForm />
      </Suspense>
    </div>
  );
}
