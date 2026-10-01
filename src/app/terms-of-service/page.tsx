import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Bhargavi Teja Collections - Read our terms and conditions for using our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Terms of Service</span>
      </nav>

      <h1 className="section-title">Terms of Service</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: October 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">By accessing and using the Bhargavi Teja Collections website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">2. Products</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>All products sold are <strong>1 gram gold imitation jewellery</strong> (gold-plated/fashion jewellery), not real gold</li>
            <li>Product images are for illustration purposes; actual products may slightly vary in colour and finish</li>
            <li>Prices are listed in Indian Rupees (INR) and are subject to change without prior notice</li>
            <li>Product availability is subject to stock</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">3. Ordering &amp; Payment</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Orders are confirmed only after payment verification</li>
            <li>We accept payments via UPI and bank transfer</li>
            <li>A payment screenshot must be uploaded at the time of placing the order</li>
            <li>We reserve the right to cancel any order at our discretion</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">4. Product Care</h2>
          <p className="text-gray-600 leading-relaxed">To maintain the quality and shine of your imitation jewellery:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Avoid contact with water, perfume, and chemicals</li>
            <li>Store in a dry place, preferably in a zip-lock pouch</li>
            <li>Remove jewellery before bathing or swimming</li>
            <li>Clean gently with a soft dry cloth</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">5. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">All content on this website, including images, logos, text, and design, is the property of Bhargavi Teja Collections and is protected by copyright laws. Unauthorized use is prohibited.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">6. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">Bhargavi Teja Collections shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability is limited to the amount paid for the product.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">7. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Krishna District, Andhra Pradesh.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">8. Contact</h2>
          <p className="text-gray-600 leading-relaxed">For questions about these terms:</p>
          <ul className="list-none text-gray-600 space-y-1 ml-4">
            <li>Phone / WhatsApp: <a href="tel:+919100369789" className="text-burgundy hover:underline">+91 91003 69789</a></li>
            <li>Email: <a href="mailto:bhargavitejacollections@gmail.com" className="text-burgundy hover:underline">bhargavitejacollections@gmail.com</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
