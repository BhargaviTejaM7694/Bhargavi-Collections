import { Suspense } from "react";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Place Order",
  description: "Order 1 gram gold imitation jewellery online from BhargaviTeja Collections, Hanuman Junction near Vijayawada. Free delivery across Andhra Pradesh. Necklaces, earrings, bangles & more.",
};

export default function OrderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Place Order</span>
      </nav>

      <h1 className="section-title">Place Your Order</h1>
      <p className="text-center text-gray-600 mb-8">Fill in your details below. All fields marked with * are required.</p>

      <div className="grid lg:grid-cols-[340px_1fr] gap-8">
        {/* How Payment Works */}
        <div className="order-2 lg:order-1">
          <div className="bg-cream rounded-lg p-6 sticky top-24">
            <h3 className="font-heading text-xl text-burgundy mb-5">How Payment Works</h3>
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-burgundy text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Select Your Items</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Browse our collections and add items to your order.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-burgundy text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Make Payment via UPI / Bank Transfer</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Send the total amount to our UPI or bank account.</p>
                  <div className="mt-2 bg-white rounded-md p-3 border border-gold/20">
                    <p className="text-xs font-medium text-burgundy mb-1">UPI ID</p>
                    <p className="text-sm text-gray-800 font-mono">bhargavitejacollections@ybl</p>
                    <div className="border-t border-gray-100 my-2"></div>
                    <p className="text-xs font-medium text-burgundy mb-1">Phone Pay / Google Pay</p>
                    <p className="text-sm text-gray-800 font-mono">+91 91003 69789</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-burgundy text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Upload Payment Screenshot</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Take a screenshot of the successful payment and upload it in the form.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-burgundy text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Submit Your Order</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Fill in your details and click &quot;Send Order&quot;. We&apos;ll confirm via call or WhatsApp.</p>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gold/20">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                </svg>
                <span>Free Delivery on All Orders</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Need help? Call <a href="tel:+919100369789" className="text-burgundy font-medium hover:underline">+91 91003 69789</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="order-1 lg:order-2">
          <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
            <OrderForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
