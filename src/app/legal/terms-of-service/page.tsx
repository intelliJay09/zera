import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | The Astra Flow',
  description:
    'Terms of Service for The Astra Flow website services, WaaS subscriptions, and custom development projects.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-cream-200 pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-light text-near-black tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-base text-near-black/60 font-light">
            Effective Date: January 3, 2025 | Last Updated: January 3, 2025
          </p>
        </div>

        <div className="mb-16 p-8 bg-copper-50">
          <p className="text-base text-near-black/80 font-light leading-relaxed mb-4">
            <strong className="text-near-black">BY ACCESSING OR USING OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS OF SERVICE.</strong>
          </p>
          <p className="text-sm text-near-black/70 font-light">
            If you do not agree to these Terms, you must not access or use our services.
          </p>
        </div>

        <article className="prose prose-lg max-w-none space-y-12">
          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              1. Company Information
            </h2>
            <div className="space-y-3 text-base text-near-black/70 font-light leading-relaxed">
              <p><strong className="text-near-black">Legal Name:</strong> The Astra Flow</p>
              <p><strong className="text-near-black">Principal Office:</strong> Ghana</p>
              <p><strong className="text-near-black">Email:</strong> hello@theastroflow.com</p>
              <p><strong className="text-near-black">Phone:</strong> +233 50 868 8828</p>
              <p><strong className="text-near-black">Markets:</strong> Ghana and United States</p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              2. Eligibility and Account Creation
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>To use our services, you must:</p>
              <ul className="space-y-2 ml-6">
                <li>• Be at least 18 years of age</li>
                <li>• Have the legal capacity to enter into a binding contract</li>
                <li>• Not be prohibited from using our services under applicable law</li>
              </ul>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              3. Services Description
            </h2>
            <div className="space-y-6 text-base text-near-black/70 font-light leading-relaxed">
              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Website as a Service (WaaS)
                </h3>
                <p>
                  Our WaaS subscriptions provide ongoing website hosting, maintenance, and support with different pricing tiers:
                </p>
                <ul className="space-y-2 ml-6 mt-3">
                  <li>• <strong className="text-near-black">Business Standard:</strong> $285/month (GHS 1000) - Up to 5 pages, basic SEO, 2 monthly updates</li>
                  <li>• <strong className="text-near-black">Business Commerce:</strong> $570/month (GHS 2000) - Up to 10 pages, e-commerce, 4 monthly updates</li>
                  <li>• <strong className="text-near-black">Business Growth+:</strong> $998/month (GHS 3500) - Up to 15 pages, premium features, 6 monthly updates</li>
                </ul>
                <p className="mt-3">
                  <strong className="text-near-black">Service Level Agreement:</strong> We guarantee 99.9% uptime for WaaS websites.
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Custom Web Development & Digital Marketing
                </h3>
                <p>
                  Custom projects are scoped individually based on client requirements. Services include web development, SEO & Digital Marketing, Social Media Management, Branding & Design, and Content Marketing.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              4. Pricing and Payment Terms
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Payment Methods
                </h3>
                <p>We accept:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Mobile Money (Ghana)</li>
                  <li>• Credit and debit cards (Visa, Mastercard, American Express)</li>
                  <li>• Bank transfers (for larger projects)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Billing Cycle
                </h3>
                <ul className="space-y-2 ml-6">
                  <li>• WaaS subscriptions are billed monthly on the anniversary of your subscription date</li>
                  <li>• Invoices are issued on the 25th of each month for the upcoming month</li>
                  <li>• Payment is due by the 1st of the service month</li>
                  <li>• Payments more than 7 days late may incur a 5% late fee</li>
                </ul>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Taxes
                </h3>
                <p>
                  All prices are exclusive of applicable taxes. You are responsible for paying all taxes associated with your purchase.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              5. Cancellation and Refund Policy
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  WaaS Subscription Cancellation
                </h3>
                <ul className="space-y-2 ml-6">
                  <li>• You may cancel with <strong className="text-near-black">30 days' written notice</strong> to hello@theastroflow.com</li>
                  <li>• Cancellation takes effect at the end of the current billing period</li>
                  <li>• <strong className="text-near-black">No refunds</strong> for partial months or unused portions</li>
                  <li>• You remain responsible for payment through the notice period</li>
                  <li>• Your website will remain live until the end of the final billing period</li>
                </ul>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Website Buyout Option
                </h3>
                <p>
                  You may purchase full ownership of your WaaS website for a <strong className="text-near-black">one-time fee of $5,000 USD</strong> (or GHS equivalent). This includes all code, design assets, and intellectual property rights.
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Custom Project Refunds
                </h3>
                <ul className="space-y-2 ml-6">
                  <li>• Deposits are non-refundable once work has commenced</li>
                  <li>• If cancelled mid-development, you will be charged for work completed</li>
                  <li>• Final payments are due upon completion and are non-refundable</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              6. Intellectual Property Rights
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  WaaS Subscription Model
                </h3>
                <p>
                  <strong className="text-near-black">During Subscription:</strong> The Astra Flow retains ownership of all code, themes, and infrastructure. You receive a license to use the website during your active subscription.
                </p>
                <p>
                  <strong className="text-near-black">Upon Cancellation:</strong> Your license terminates. We retain all rights to code and design.
                </p>
                <p>
                  <strong className="text-near-black">Content Ownership:</strong> You own all content you provide (text, images, logos).
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Custom Development Projects
                </h3>
                <p>
                  Upon full payment, you receive ownership of the final deliverables. We retain rights to pre-existing components and proprietary frameworks.
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Domain Ownership
                </h3>
                <p>
                  If we register a domain on your behalf, legal ownership will be in your name. You retain full ownership and will receive domain registrar credentials.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              7. Service Level Agreement (SLA)
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Uptime Guarantee
                </h3>
                <p>We commit to <strong className="text-near-black">99.9% Monthly Uptime</strong> for WaaS websites.</p>
                <p className="mt-3"><strong className="text-near-black">Exclusions:</strong></p>
                <ul className="space-y-2 ml-6">
                  <li>• Scheduled maintenance (with 48-hour notice)</li>
                  <li>• Force majeure events</li>
                  <li>• Third-party service failures</li>
                  <li>• DDoS attacks or security incidents</li>
                </ul>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Service Credits
                </h3>
                <p>If we fail to meet the 99.9% uptime SLA:</p>
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-sm">
                    <thead className="bg-cream-100">
                      <tr>
                        <th className="text-left p-4 text-near-black font-light">Monthly Uptime</th>
                        <th className="text-left p-4 text-near-black font-light">Service Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-cream-300">
                        <td className="p-4">99.0% - 99.8%</td>
                        <td className="p-4">10% of monthly fee</td>
                      </tr>
                      <tr className="border-t border-cream-300">
                        <td className="p-4">98.0% - 98.9%</td>
                        <td className="p-4">25% of monthly fee</td>
                      </tr>
                      <tr className="border-t border-cream-300">
                        <td className="p-4">Below 98.0%</td>
                        <td className="p-4">50% of monthly fee</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm">
                  Service credits must be claimed within 5 business days by emailing hello@theastroflow.com with "SLA Credit Request" in the subject line.
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3">
                  Support Response Times
                </h3>
                <ul className="space-y-2 ml-6">
                  <li>• <strong className="text-near-black">Standard Support:</strong> 8-hour response time (Business Standard & Commerce plans)</li>
                  <li>• <strong className="text-near-black">Priority Support:</strong> 4-hour response time (Business Growth+ plan)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              8. Client Responsibilities
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>You agree to:</p>
              <ul className="space-y-2 ml-6">
                <li>• Provide accurate, complete, and timely content</li>
                <li>• Ensure all content is legally compliant and does not infringe third-party rights</li>
                <li>• Provide timely feedback (typically within 5 business days)</li>
                <li>• Use services in compliance with all applicable laws</li>
              </ul>
              <p className="mt-4"><strong className="text-near-black">Prohibited Uses:</strong></p>
              <ul className="space-y-2 ml-6">
                <li>• Illegal activities or content</li>
                <li>• Spam or unsolicited bulk emails</li>
                <li>• Infringement of intellectual property rights</li>
                <li>• Malware, viruses, or harmful code</li>
                <li>• Hateful, violent, or pornographic content</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              9. Limitation of Liability
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p className="text-near-black font-normal">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY SHALL NOT EXCEED:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-near-black">For WaaS Subscriptions:</strong> The total fees paid in the 12 months preceding the claim, or $500 USD, whichever is greater</li>
                <li>• <strong className="text-near-black">For Custom Projects:</strong> The total fees paid for the specific project</li>
              </ul>
              <p className="mt-4">
                We shall not be liable for indirect, incidental, special, consequential, or punitive damages including loss of profits, revenue, data, or business opportunities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              10. Dispute Resolution and Governing Law
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                <strong className="text-near-black">For Ghana-based Clients:</strong> These Terms shall be governed by the laws of the Republic of Ghana. Disputes shall be resolved through negotiation, mediation, then arbitration in Accra, Ghana.
              </p>
              <p>
                <strong className="text-near-black">For US-based Clients:</strong> These Terms shall be governed by the laws of the United States. Disputes shall be resolved through negotiation, mediation, then arbitration under American Arbitration Association (AAA) rules.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              11. Changes to Terms
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                We may update these Terms from time to time. Changes will be effective 30 days after posting for existing users. We will notify you by email of material changes.
              </p>
              <p>
                Your continued use of services after changes constitutes acceptance of the updated Terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              12. Contact Information
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>For questions about these Terms or our services, please contact us:</p>
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
                  For legal inquiries, please mark your communication "Legal Department" in the subject line.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-8 mt-12 border-t border-cream-300">
            <div className="flex flex-wrap gap-6">
              <Link
                href="/legal/privacy-policy"
                className="text-copper-600 hover:text-copper-700 transition-colors font-light underline"
              >
                Privacy Policy
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
