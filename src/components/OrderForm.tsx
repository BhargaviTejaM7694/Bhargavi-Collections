"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendOrderEmail } from "@/lib/emailjs";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function OrderForm() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product") || "";
  const { selectedItems, removeItem, toggleItem, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    additionalProduct: "",
  });

  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselectedProduct) {
      const product = products.find((p) => p.id === preselectedProduct);
      if (product && !selectedItems.find((p) => p.id === preselectedProduct)) {
        toggleItem(product);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedProduct]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
  const isValidPincode = (pincode: string) => /^\d{6}$/.test(pincode);

  const hasItems = selectedItems.length > 0;

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const isFormValid =
    form.name.trim() !== "" &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone) &&
    form.addressLine1.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state !== "" &&
    isValidPincode(form.pincode) &&
    hasItems &&
    paymentFile !== null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (form.additionalProduct) {
      const product = products.find((p) => p.id === form.additionalProduct);
      if (product && !selectedItems.find((p) => p.id === product.id)) {
        toggleItem(product);
      }
      setForm({ ...form, additionalProduct: "" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !paymentFile) return;

    setSubmitting(true);
    setError("");

    try {
      const screenshotUrl = await uploadToCloudinary(paymentFile);

      await sendOrderEmail({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        productName: selectedItems.map((p) => p.name).join(", "),
        productPrice: `₹${totalPrice.toLocaleString("en-IN")} (${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""})`,
        productLink: selectedItems.map((p) => `${window.location.origin}/products/${p.id}`).join(", "),
        paymentScreenshotUrl: screenshotUrl,
      });

      clearCart();
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-heading text-2xl text-brand-green mb-2">Order Submitted!</h2>
        <p className="text-gray-600">Thank you for your order. We will contact you shortly to confirm.</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
      )}

      {/* Selected Items Section */}
      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">Selected Items</h3>

        {hasItems ? (
          <div className="space-y-3">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-cream/50 border border-gold/20 rounded-lg p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-medium text-gray-800 hover:text-burgundy transition-colors text-sm truncate block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gold font-bold text-sm">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label={`Remove ${item.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t border-gold/20">
              <span className="font-medium text-gray-700">
                Total ({selectedItems.length} item{selectedItems.length > 1 ? "s" : ""})
              </span>
              <span className="text-gold font-bold text-lg">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-gray-400 text-sm">No items selected yet</p>
            <Link href="/collections/necklaces" className="text-burgundy text-sm hover:underline mt-1 inline-block">
              Browse collections
            </Link>
          </div>
        )}

        {/* Add more items dropdown */}
        <div className="mt-4 flex gap-2">
          <select
            name="additionalProduct"
            value={form.additionalProduct}
            onChange={handleChange}
            className={`${inputClass} flex-1`}
          >
            <option value="">Add more items...</option>
            {products
              .filter((p) => p.inStock && !selectedItems.find((s) => s.id === p.id))
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — ₹{product.price.toLocaleString("en-IN")}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={handleAddProduct}
            disabled={!form.additionalProduct}
            className={`px-4 py-3 rounded-md font-medium text-sm transition-colors ${
              form.additionalProduct
                ? "bg-burgundy text-white hover:bg-burgundy-dark"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">Personal Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>Full Name *</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Enter your full name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email ID *</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="yourname@gmail.com" className={inputClass} />
            {form.email && !isValidEmail(form.email) && <p className="text-red-500 text-xs mt-1">Enter a valid email address</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number *</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500 text-sm">+91</span>
              <input id="phone" name="phone" type="tel" required maxLength={10} value={form.phone} onChange={handleChange} placeholder="9876543210" className={`${inputClass} rounded-l-none`} />
            </div>
            {form.phone && !isValidPhone(form.phone) && <p className="text-red-500 text-xs mt-1">Enter a valid 10-digit mobile number</p>}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">Delivery Address</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="addressLine1" className={labelClass}>Address Line 1 *</label>
            <input id="addressLine1" name="addressLine1" type="text" required value={form.addressLine1} onChange={handleChange} placeholder="House/Flat No., Building Name, Street" className={inputClass} />
          </div>
          <div>
            <label htmlFor="addressLine2" className={labelClass}>Address Line 2</label>
            <input id="addressLine2" name="addressLine2" type="text" value={form.addressLine2} onChange={handleChange} placeholder="Landmark, Area (optional)" className={inputClass} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className={labelClass}>City *</label>
              <input id="city" name="city" type="text" required value={form.city} onChange={handleChange} placeholder="City" className={inputClass} />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>State *</label>
              <select id="state" name="state" required value={form.state} onChange={handleChange} className={inputClass}>
                <option value="">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pincode" className={labelClass}>Pincode *</label>
              <input id="pincode" name="pincode" type="text" required maxLength={6} value={form.pincode} onChange={handleChange} placeholder="500001" className={inputClass} />
              {form.pincode && !isValidPincode(form.pincode) && <p className="text-red-500 text-xs mt-1">Enter a valid 6-digit pincode</p>}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">Payment</h3>
        <div>
          <label htmlFor="paymentScreenshot" className={labelClass}>Payment Screenshot *</label>
          <p className="text-sm text-gray-500 mb-2">Upload a screenshot of your payment (UPI / Bank Transfer)</p>
          <input
            id="paymentScreenshot"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-burgundy file:text-white hover:file:bg-burgundy-dark file:cursor-pointer"
          />
          {paymentFile && <p className="text-green-600 text-sm mt-1">Selected: {paymentFile.name}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || submitting}
        className={`w-full py-4 rounded-md text-lg font-medium transition-all duration-200 ${
          isFormValid && !submitting
            ? "bg-burgundy text-white hover:bg-burgundy-dark cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending Order...
          </span>
        ) : (
          `Send Order${hasItems ? ` — ₹${totalPrice.toLocaleString("en-IN")}` : ""}`
        )}
      </button>
    </form>
  );
}
