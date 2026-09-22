"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    selectedProduct: preselectedProduct,
  });

  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselectedProduct) {
      setForm((prev) => ({ ...prev, selectedProduct: preselectedProduct }));
    }
  }, [preselectedProduct]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
  const isValidPincode = (pincode: string) => /^\d{6}$/.test(pincode);

  const isFormValid =
    form.name.trim() !== "" &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone) &&
    form.addressLine1.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state !== "" &&
    isValidPincode(form.pincode) &&
    form.selectedProduct !== "" &&
    paymentFile !== null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !paymentFile) return;

    setSubmitting(true);
    setError("");

    try {
      const screenshotUrl = await uploadToCloudinary(paymentFile);
      const selectedProduct = products.find((p) => p.id === form.selectedProduct);
      const productLink = `${window.location.origin}/products/${form.selectedProduct}`;

      await sendOrderEmail({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        productName: selectedProduct?.name || form.selectedProduct,
        productPrice: selectedProduct ? `₹${selectedProduct.price.toLocaleString("en-IN")}` : "N/A",
        productLink,
        paymentScreenshotUrl: screenshotUrl,
      });

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
        <h3 className="font-heading text-xl text-brand-green mb-4">Order Details</h3>
        <div>
          <label htmlFor="selectedProduct" className={labelClass}>Select Item *</label>
          <select id="selectedProduct" name="selectedProduct" required value={form.selectedProduct} onChange={handleChange} className={inputClass}>
            <option value="">Choose a product</option>
            {products.filter((p) => p.inStock).map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} — ₹{product.price.toLocaleString("en-IN")}
              </option>
            ))}
          </select>
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
          "Send Order"
        )}
      </button>
    </form>
  );
}
