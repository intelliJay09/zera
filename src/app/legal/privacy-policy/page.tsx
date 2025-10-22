import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Astra Flow',
  description:
    'Learn how The Astra Flow collects, uses, and protects your personal data. GDPR and Ghana Data Protection Act compliant.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-cream-200 pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-light text-near-black tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-near-black/60 font-light">
            Effective Date: January 3, 2025 | Last Updated: January 3, 2025
          </p>
        </div>

        <div className="mb-16 p-8 bg-copper-50">
          <p className="text-base text-near-black/80 font-light leading-relaxed">
            The Astra Flow respects your privacy and is committed to protecting your personal data. This Privacy Policy complies with the GDPR (EU) 2016/679, Ghana Data Protection Act 2012 (Act 843), and United States data privacy laws.
          </p>
        </div>

        <article className="prose prose-lg max-w-none space-y-12">
          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Personal Information You Provide
                </h3>
                <p>When you use our services, we collect:</p>
                <ul className="space-y-2 ml-6 mt-3">
                  <li>• Full name, email address, phone number</li>
                  <li>• Company name and position</li>
                  <li>• Billing address and business address</li>
                  <li>• Payment information (processed through secure third-party processors)</li>
                  <li>• Project requirements and specifications</li>
                  <li>• Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Information Collected Automatically
                </h3>
                <ul className="space-y-2 ml-6">
                  <li>• IP address, browser type, device information</li>
                  <li>• Pages visited and navigation patterns</li>
                  <li>• Cookies and similar tracking technologies</li>
                  <li>• Google Analytics data (demographics, location, session duration)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>We use your personal data for:</p>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-near-black">Service Delivery:</strong> Providing WaaS subscriptions, custom development, and digital marketing services</li>
                <li>• <strong className="text-near-black">Business Operations:</strong> Processing payments, managing accounts, customer support</li>
                <li>• <strong className="text-near-black">Marketing:</strong> Sending promotional emails (with your consent)</li>
                <li>• <strong className="text-near-black">Analytics:</strong> Analyzing website usage to improve services</li>
                <li>• <strong className="text-near-black">Legal Compliance:</strong> Preventing fraud, enforcing Terms of Service</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              3. Data Sharing and Disclosure
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p className="text-near-black font-normal">
                We do not sell, rent, or trade your personal information to third parties.
              </p>
              <p>We share data with trusted service providers:</p>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-near-black">Hosting Providers:</strong> For website hosting and server management</li>
                <li>• <strong className="text-near-black">Payment Processors:</strong> PCI DSS-compliant processors for Mobile Money and card payments</li>
                <li>• <strong className="text-near-black">Analytics Providers:</strong> Google Analytics for website analytics</li>
                <li>• <strong className="text-near-black">Email Service Providers:</strong> For transactional and marketing emails</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              4. Data Retention
            </h2>
            <div className="space-y-3 text-base text-near-black/70 font-light leading-relaxed">
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-near-black">Client Account Data:</strong> Retained for 3 years after account closure</li>
                <li>• <strong className="text-near-black">Payment Records:</strong> Retained for 7 years (tax and financial regulations)</li>
                <li>• <strong className="text-near-black">Marketing Data:</strong> Retained until you unsubscribe</li>
                <li>• <strong className="text-near-black">Website Analytics:</strong> Retained for 26 months (Google Analytics default)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              5. Your Data Protection Rights
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>Under GDPR and Ghana Data Protection Act, you have the right to:</p>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-near-black">Access:</strong> Request copies of your personal data</li>
                <li>• <strong className="text-near-black">Rectification:</strong> Request correction of inaccurate data</li>
                <li>• <strong className="text-near-black">Erasure:</strong> Request deletion of your data</li>
                <li>• <strong className="text-near-black">Restriction:</strong> Request restricted processing</li>
                <li>• <strong className="text-near-black">Data Portability:</strong> Request transfer to another provider</li>
                <li>• <strong className="text-near-black">Object:</strong> Object to processing for marketing purposes</li>
                <li>• <strong className="text-near-black">Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise your rights, contact us at{' '}
                <a href="mailto:hello@theastroflow.com" className="text-copper-600 hover:text-copper-700">
                  hello@theastroflow.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              6. Data Security
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>We implement appropriate security measures including:</p>
              <ul className="space-y-2 ml-6">
                <li>• SSL/TLS encryption for data transmission</li>
                <li>• Secure, encrypted storage systems</li>
                <li>• Regular security assessments and updates</li>
                <li>• Access controls and authentication</li>
                <li>• PCI DSS compliance for payment processing</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              7. International Data Transfers
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                The Astra Flow operates in Ghana and serves clients internationally. Your data may be transferred to and processed in Ghana, United States, European Union, or other countries where our service providers operate.
              </p>
              <p>
                We ensure appropriate safeguards including Standard Contractual Clauses (SCCs) and Data Processing Agreements with service providers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              8. Children's Privacy
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                Our services are not directed to individuals under 18 (or under 13 in the United States for COPPA compliance). We do not knowingly collect personal information from minors without parental consent.
              </p>
              <p>
                If you believe your child has provided us with personal information, contact us at{' '}
                <a href="mailto:hello@theastroflow.com" className="text-copper-600 hover:text-copper-700">
                  hello@theastroflow.com
                </a>
                {' '}and we will delete it promptly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              9. Marketing Communications
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>With your consent, we may send marketing emails about our services. You can opt out anytime by:</p>
              <ul className="space-y-2 ml-6">
                <li>• Clicking the "unsubscribe" link in any marketing email</li>
                <li>• Contacting us at hello@theastroflow.com</li>
                <li>• Updating your preferences in your account settings</li>
              </ul>
              <p className="mt-4">
                Even if you opt out of marketing, we will still send transactional emails related to your services (invoices, support responses, service updates).
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              10. Changes to This Privacy Policy
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email and by posting a prominent notice on our website.
              </p>
              <p>
                Your continued use of our services after changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              11. Contact Us
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                For questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="p-6 bg-cream-100 space-y-2">
                <p className="text-near-black font-normal">The Astra Flow</p>
                <p>
                  Email:{' '}
                  <a href="mailto:hello@theastroflow.com" className="text-copper-600 hover:text-copper-700">
                    hello@theastroflow.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+233508688828" className="text-copper-600 hover:text-copper-700">
                    +233 50 868 8828
                  </a>
                </p>
                <p className="text-sm text-near-black/60 mt-3">
                  For data protection inquiries, please mark your communication as "Data Protection Request" in the subject line.
                </p>
              </div>
              <div className="mt-6 p-4 bg-copper-50">
                <p className="text-sm text-near-black/70 font-light">
                  <strong className="text-near-black">Lodge a Complaint:</strong> If you are unhappy with how we handle your data, you have the right to lodge a complaint with the Ghana Data Protection Commission or your local supervisory authority.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-8 mt-12 border-t border-cream-300">
            <div className="flex flex-wrap gap-6">
              <Link
                href="/legal/terms-of-service"
                className="text-copper-600 hover:text-copper-700 transition-colors font-light underline"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/cookie-policy"
                className="text-copper-600 hover:text-copper-700 transition-colors font-light underline"
              >
                Cookie Policy
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
