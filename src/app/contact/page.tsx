import Link from "next/link";

export const metadata = {
  title: "Contact Us | Bhargavi Teja Collections",
  description: "Get in touch with Bhargavi Teja Collections for queries about 1 gram gold imitation jewellery.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Contact</span>
      </nav>

      <h1 className="section-title">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-cream rounded-lg p-8">
            <h2 className="font-heading text-2xl text-burgundy mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <a href="tel:+919100369789" className="text-burgundy hover:underline">+91 91003 69789</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <a href="mailto:bhargavitejacollections@gmail.com" className="text-burgundy hover:underline">bhargavitejacollections@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">Mon – Sat: 10 AM – 7 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-burgundy/5 rounded-lg p-8">
            <h2 className="font-heading text-2xl text-burgundy mb-4">How to Order</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Browse our collections and pick your favourite piece</li>
              <li>Click &ldquo;Order Now&rdquo; on the product page</li>
              <li>Fill in your delivery details</li>
              <li>Make payment via UPI or bank transfer</li>
              <li>Upload the payment screenshot</li>
              <li>Submit — we&apos;ll confirm and dispatch your order</li>
            </ol>
          </div>
          <Link href="/order" className="btn-primary text-center">Place an Order</Link>
        </div>
      </div>
    </div>
  );
}
