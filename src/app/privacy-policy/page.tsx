import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Bhargavi Teja Collections - How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Privacy Policy</span>
      </nav>

      <h1 className="section-title">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: October 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed">When you place an order or contact us, we may collect the following information:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Full name</li>
            <li>Email address (optional)</li>
            <li>Phone number</li>
            <li>Delivery address (street, city, state, pincode)</li>
            <li>Payment screenshot for order verification</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">We use your personal information to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Process and deliver your orders</li>
            <li>Send order status updates via email or WhatsApp</li>
            <li>Respond to your queries and provide customer support</li>
            <li>Improve our products and services</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">3. Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. Your data may only be shared with delivery partners for the sole purpose of delivering your order.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">4. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">5. Cookies</h2>
          <p className="text-gray-600 leading-relaxed">Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-burgundy mb-3">6. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">If you have questions about this Privacy Policy, please contact us:</p>
          <ul className="list-none text-gray-600 space-y-1 ml-4">
            <li>Phone: <a href="tel:+919100369789" className="text-burgundy hover:underline">+91 91003 69789</a></li>
            <li>Email: <a href="mailto:bhargavitejacollections@gmail.com" className="text-burgundy hover:underline">bhargavitejacollections@gmail.com</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
