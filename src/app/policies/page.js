'use client';

import { useState } from 'react';

export default function Policies() {
  const [activePolicy, setActivePolicy] = useState('privacy');

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h3>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you create an account, make a purchase, 
              subscribe to our newsletter, or contact us for support. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Name, email address, phone number, and billing/shipping addresses</li>
              <li>Payment information (processed securely through our payment processors)</li>
              <li>Order history and preferences</li>
              <li>Communication preferences</li>
              <li>Customer service interactions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Information Sharing</h3>
            <p className="text-gray-600">
              We do not sell, trade, or rent your personal information to third parties. We may share your information 
              only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
              <li>With service providers who help us operate our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h3>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h3>
            <p className="text-gray-600">You have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
              <li>Access and update your personal information</li>
              <li>Delete your account and personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Contact us with questions about this policy</li>
            </ul>
          </div>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Agreement to Terms</h3>
            <p className="text-gray-600">
              By accessing and using Sunainscent ("we," "our," or "us"), you accept and agree to be bound by the 
              terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Use License</h3>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily download one copy of the materials on Sunainscent's website for 
              personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>attempt to decompile or reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Responsibilities</h3>
            <p className="text-gray-600">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Prohibited Uses</h3>
            <p className="text-gray-600">You may not use our service:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
              <li>For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer</h3>
            <p className="text-gray-600">
              The materials on Sunainscent's website are provided on an 'as is' basis. Sunainscent makes no warranties, 
              expressed or implied, and hereby disclaim and negates all other warranties including without limitation, 
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
          </div>
        </div>
      )
    },
    shipping: {
      title: 'Shipping Policy',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Processing Time</h3>
            <p className="text-gray-600">
              Orders are typically processed within 1-2 business days. During peak seasons or promotional periods, 
              processing may take up to 3-5 business days. You will receive a confirmation email once your order has been processed.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Shipping Methods & Rates</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">Standard Shipping (5-7 business days)</h4>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
                  <li>Orders under $50: $5.99</li>
                  <li>Orders $50-$99: $3.99</li>
                  <li>Orders $100+: FREE</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Express Shipping (2-3 business days)</h4>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
                  <li>Orders under $100: $12.99</li>
                  <li>Orders $100+: $8.99</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Overnight Shipping (1 business day)</h4>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
                  <li>All orders: $24.99</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">International Shipping</h3>
            <p className="text-gray-600 mb-4">
              We currently ship to the following countries: United States, Canada, United Kingdom, Australia, and European Union countries. 
              International shipping rates are calculated at checkout based on destination and weight.
            </p>
            <p className="text-gray-600">
              Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Tracking</h3>
            <p className="text-gray-600">
              Once your order has shipped, you will receive a tracking number via email. You can track your package using this number 
              on our website or the carrier's website.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Delivery Issues</h3>
            <p className="text-gray-600">
              If your package is lost or damaged during shipping, please contact us within 30 days of the expected delivery date. 
              We will work with the shipping carrier to resolve the issue promptly.
            </p>
          </div>
        </div>
      )
    },
    returns: {
      title: 'Return & Refund Policy',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Return Window</h3>
            <p className="text-gray-600">
              We accept returns within 30 days of delivery. Items must be unused, in original packaging, and in the same condition 
              as received. Custom or personalized items cannot be returned unless they arrive damaged or defective.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Return Process</h3>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>Contact our customer service team to initiate a return</li>
              <li>Receive your return authorization number (RMA)</li>
              <li>Pack the item securely with the original packaging</li>
              <li>Include the RMA number and original receipt</li>
              <li>Ship the item to our return address (provided with RMA)</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Return Shipping</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Defective or damaged items: We provide prepaid return labels</li>
              <li>Change of mind returns: Customer is responsible for return shipping costs</li>
              <li>International returns: Customer pays all return shipping and customs fees</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Refund Processing</h3>
            <p className="text-gray-600 mb-4">
              Once we receive and inspect your returned item, we will process your refund within 5-7 business days. 
              Refunds will be issued to the original payment method.
            </p>
            <p className="text-gray-600">
              Please note that shipping charges are non-refundable unless the return is due to our error.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Exchanges</h3>
            <p className="text-gray-600">
              We do not offer direct exchanges. If you need a different size or color, please return the original item 
              and place a new order. This ensures faster processing and availability.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Damaged or Defective Items</h3>
            <p className="text-gray-600">
              If you receive a damaged or defective item, please contact us immediately with photos of the issue. 
              We will provide a prepaid return label and expedite a replacement or full refund.
            </p>
          </div>
        </div>
      )
    },
    cookies: {
      title: 'Cookie Policy',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What Are Cookies?</h3>
            <p className="text-gray-600">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with 
              a better browsing experience by remembering your preferences and improving our site functionality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Types of Cookies We Use</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">Essential Cookies</h4>
                <p className="text-gray-600 mt-1">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, 
                  network management, and accessibility.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Performance Cookies</h4>
                <p className="text-gray-600 mt-1">
                  These cookies collect information about how visitors use our website, such as which pages are most popular. 
                  This data helps us improve our website performance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Functional Cookies</h4>
                <p className="text-gray-600 mt-1">
                  These cookies remember your preferences and settings, such as language selection and shopping cart contents, 
                  to provide a more personalized experience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Marketing Cookies</h4>
                <p className="text-gray-600 mt-1">
                  These cookies track your browsing habits to show you relevant advertisements. They may be used to build a profile 
                  of your interests and show you relevant ads on other sites.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Managing Cookies</h3>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Most browsers allow you to view, manage, and delete cookies</li>
              <li>You can set your browser to refuse cookies or alert you when cookies are being sent</li>
              <li>You can opt-out of targeted advertising cookies through industry opt-out pages</li>
              <li>You can manage your preferences through our cookie consent banner</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Cookies</h3>
            <p className="text-gray-600">
              We may use third-party services such as Google Analytics, social media platforms, and advertising networks that 
              may place their own cookies on your device. These cookies are governed by their respective privacy policies.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie Retention</h3>
            <p className="text-gray-600">
              Cookies are retained for different periods depending on their type and purpose. Session cookies are deleted when you 
              close your browser, while persistent cookies may remain for up to 2 years or until you delete them.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Policies</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn about our terms, privacy practices, shipping policies, and more.
          </p>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Policy Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Policy Sections</h2>
                <nav className="space-y-2">
                  {Object.entries(policies).map(([key, policy]) => (
                    <button
                      key={key}
                      onClick={() => setActivePolicy(key)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${ 
                        activePolicy === key 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {policy.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Policy Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  {policies[activePolicy].title}
                </h2>
                
                <div className="prose max-w-none">
                  {policies[activePolicy].content}
                </div>

                {/* Last Updated */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Last updated: December 15, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Questions About Our Policies?</h2>
          <p className="text-lg text-gray-600 mb-8">
            If you have any questions about these policies or need clarification on any terms, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:legal@sunainscent.com"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Email Legal Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}