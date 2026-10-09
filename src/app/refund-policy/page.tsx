import Link from "next/link";

export const metadata = {
  title: "Refund Policy",
  description: "Refund and Return Policy for BhargaviTeja Collections - 1 gram gold imitation jewellery.",
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Refund Policy</span>
      </nav>

      <h1 className="section-title">Refund &amp; Return Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: October 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">1. Return Eligibility</h2>
          <p className="text-gray-600 leading-relaxed">We accept returns under the following conditions:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>The item must be returned within <strong>3 days</strong> of delivery</li>
            <li>The item must be unused, unworn, and in its original packaging</li>
            <li>The item must not be damaged, altered, or tampered with by the customer</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">2. Non-Returnable Items</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Customized or made-to-order jewellery</li>
            <li>Items purchased during clearance sales</li>
            <li>Earrings and nose pins (for hygiene reasons)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">3. Damaged or Defective Products</h2>
          <p className="text-gray-600 leading-relaxed">If you receive a damaged or defective product, please contact us within <strong>24 hours</strong> of delivery with photos of the item. We will arrange a free replacement or full refund.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">4. Refund Process</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Once we receive and inspect the returned item, we will notify you of the approval or rejection</li>
            <li>Approved refunds will be processed within <strong>5-7 business days</strong></li>
            <li>Refunds will be credited to the original payment method (UPI/bank transfer)</li>
            <li>Shipping charges are non-refundable unless the return is due to our error</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">5. Exchange Policy</h2>
          <p className="text-gray-600 leading-relaxed">We offer exchanges for items of equal or higher value. If the replacement item costs more, you will need to pay the difference. Exchanges are subject to product availability.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">6. How to Initiate a Return</h2>
          <p className="text-gray-600 leading-relaxed">To initiate a return or exchange, contact us via:</p>
          <ul className="list-none text-gray-600 space-y-1 ml-4">
            <li>Phone / WhatsApp: <a href="tel:+919100369789" className="text-burgundy hover:underline">+91 91003 69789</a></li>
            <li>Email: <a href="mailto:bhargavitejacollections@gmail.com" className="text-burgundy hover:underline">bhargavitejacollections@gmail.com</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
