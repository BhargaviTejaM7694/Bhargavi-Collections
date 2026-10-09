import Link from "next/link";

export const metadata = {
  title: "Customer Support",
  description: "Customer Support for BhargaviTeja Collections - We are here to help with your orders, returns, and queries.",
};

export default function CustomerSupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Customer Support</span>
      </nav>

      <h1 className="section-title">Customer Support</h1>

      <div className="prose prose-gray max-w-none space-y-8">
        <div className="bg-cream rounded-lg p-8">
          <h2 className="font-heading text-2xl text-burgundy mb-4">How Can We Help You?</h2>
          <p className="text-gray-600 leading-relaxed">At BhargaviTeja Collections, your satisfaction is our priority. Our dedicated support team is available to assist you with any questions, concerns, or issues.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2">Order Related</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>Track your order status</li>
              <li>Modify or cancel your order</li>
              <li>Payment confirmation issues</li>
              <li>Missing or incorrect items</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2">Returns &amp; Exchanges</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>Initiate a return or exchange</li>
              <li>Check return eligibility</li>
              <li>Refund status enquiry</li>
              <li>Damaged product complaints</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2">Product Information</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>Product availability</li>
              <li>Bulk / wholesale enquiries</li>
              <li>Custom jewellery requests</li>
              <li>Product care guidance</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2">General Queries</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>Rental jewellery enquiries</li>
              <li>Business collaboration</li>
              <li>Feedback &amp; suggestions</li>
              <li>Website issues</li>
            </ul>
          </div>
        </div>

        <div className="bg-burgundy/5 rounded-lg p-8">
          <h2 className="font-heading text-xl text-burgundy mb-4">Reach Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
              <a href="tel:+919100369789" className="text-burgundy hover:underline text-sm">+91 91003 69789</a>
              <p className="text-gray-500 text-xs mt-1">Mon-Sat, 10 AM - 7 PM</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">WhatsApp</h3>
              <a href="https://wa.me/919100369789" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">+91 91003 69789</a>
              <p className="text-gray-500 text-xs mt-1">Quick response</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Email</h3>
              <a href="mailto:bhargavitejacollections@gmail.com" className="text-burgundy hover:underline text-sm">bhargavitejacollections@gmail.com</a>
              <p className="text-gray-500 text-xs mt-1">Response within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Have a question? Send us a message directly!</p>
          <Link href="/contact" className="btn-primary inline-block">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
