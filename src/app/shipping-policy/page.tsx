import Link from "next/link";

export const metadata = {
  title: "Shipping Policy",
  description: "Shipping Policy for BhargaviTeja Collections - Free delivery across Andhra Pradesh on all orders.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Shipping Policy</span>
      </nav>

      <h1 className="section-title">Shipping Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: October 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">1. Shipping Coverage</h2>
          <p className="text-gray-600 leading-relaxed">We ship across India. Our primary delivery areas include Vijayawada, Hanuman Junction, Gudivada, Machilipatnam, Tenali, Guntur, Eluru, and all of Andhra Pradesh.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">2. Free Delivery</h2>
          <p className="text-gray-600 leading-relaxed">We offer <strong>free delivery on all orders</strong> across India. No minimum order value is required.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">3. Processing Time</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Orders are processed within <strong>1-2 business days</strong> after payment confirmation</li>
            <li>Custom or made-to-order items may take <strong>3-5 business days</strong> for processing</li>
            <li>Orders placed on Sundays and holidays will be processed on the next business day</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">4. Delivery Time</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li><strong>Vijayawada &amp; nearby areas:</strong> 1-2 days</li>
            <li><strong>Within Andhra Pradesh:</strong> 2-4 days</li>
            <li><strong>Rest of India:</strong> 4-7 business days</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-2">Delivery times may vary during festivals, holidays, or due to unforeseen circumstances.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">5. Order Tracking</h2>
          <p className="text-gray-600 leading-relaxed">Once your order is shipped, you will receive a status update via email or WhatsApp with tracking details. You can also contact us to enquire about your order status.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">6. Packaging</h2>
          <p className="text-gray-600 leading-relaxed">All jewellery items are carefully packaged in protective boxes to ensure they reach you in perfect condition.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">7. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">For shipping-related queries, contact us:</p>
          <ul className="list-none text-gray-600 space-y-1 ml-4">
            <li>Phone / WhatsApp: <a href="tel:+919100369789" className="text-burgundy hover:underline">+91 91003 69789</a></li>
            <li>Email: <a href="mailto:bhargavitejacollections@gmail.com" className="text-burgundy hover:underline">bhargavitejacollections@gmail.com</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
