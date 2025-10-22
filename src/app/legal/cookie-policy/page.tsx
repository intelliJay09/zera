import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | The Astra Flow',
  description:
    'Learn about how The Astra Flow uses cookies and similar technologies to improve your browsing experience, analyze site traffic, and personalize content.',
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-cream-200 pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-light text-near-black tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-base text-near-black/60 font-light">
            Effective Date: January 3, 2025 | Last Updated: January 3, 2025
          </p>
        </div>

        <nav className="mb-16 p-8 bg-cream-100">
          <h2 className="font-playfair text-2xl font-light text-near-black mb-6 tracking-tight">
            Table of Contents
          </h2>
          <ol className="space-y-3">
            {[
              { href: '#introduction', title: 'Introduction' },
              { href: '#what-are-cookies', title: 'What Are Cookies?' },
              { href: '#why-we-use', title: 'Why We Use Cookies' },
              { href: '#types-of-cookies', title: 'Types of Cookies We Use' },
              { href: '#third-party', title: 'Third-Party Cookies' },
              { href: '#manage-cookies', title: 'How to Manage Cookies' },
              { href: '#contact', title: 'Contact Us' },
            ].map((item, index) => (
              <li key={item.href} className="flex items-start gap-3">
                <span className="text-copper-500 font-light min-w-[1.5rem]">
                  {index + 1}.
                </span>
                <Link
                  href={item.href}
                  className="text-near-black/70 hover:text-copper-500 transition-colors duration-200 font-light"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose prose-lg max-w-none space-y-12">
          <section id="introduction">
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              1. Introduction
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                The Astra Flow and our partners use cookies and similar technologies to recognize you when you visit our website at theastroflow.com. This Cookie Policy explains what these technologies are, why we use them, and your rights to control our use of them.
              </p>
              <p>This policy should be read together with our Privacy Policy and Terms of Service.</p>
            </div>
          </section>

          <section id="what-are-cookies">
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              2. What Are Cookies?
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                Cookies are small text files placed on your device when you visit a website. They allow the website to recognize your device and remember information about your visit, such as preferences, login status, or browsing behavior.
              </p>
              <p>
                <strong className="text-near-black">Types of technologies:</strong>
              </p>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-near-black">Cookies:</strong> Small text files stored on your device</li>
                <li>• <strong className="text-near-black">Web Beacons:</strong> Tiny graphics embedded in web pages or emails</li>
                <li>• <strong className="text-near-black">Local Storage:</strong> Technology that stores data locally in your browser</li>
                <li>• <strong className="text-near-black">Session Storage:</strong> Temporary storage cleared when you close your browser</li>
              </ul>
            </div>
          </section>

          <section id="why-we-use">
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              3. Why We Use Cookies
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>We use cookies for several purposes:</p>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-near-black">Essential Functionality:</strong> To enable core website features and ensure the site works properly</li>
                <li>• <strong className="text-near-black">Performance and Analytics:</strong> To understand how visitors use our website and improve user experience</li>
                <li>• <strong className="text-near-black">Security:</strong> To protect your account and prevent fraudulent activity</li>
                <li>• <strong className="text-near-black">Preferences:</strong> To remember your settings and preferences</li>
                <li>• <strong className="text-near-black">Marketing:</strong> To deliver relevant advertising and measure campaign effectiveness</li>
              </ul>
            </div>
          </section>

          <section id="types-of-cookies">
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              4. Types of Cookies We Use
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3 tracking-tight">
                  Essential Cookies (Strictly Necessary)
                </h3>
                <p className="text-base text-near-black/70 font-light leading-relaxed mb-4">
                  These cookies are necessary for the website to function and cannot be disabled without severely affecting your ability to use the site.
                </p>
                <div className="bg-cream-100 p-4">
                  <p className="text-sm text-near-black/70 font-light">
                    <strong className="text-near-black">Examples:</strong> Session identifier cookies, CSRF tokens, load balancer cookies
                  </p>
                  <p className="text-sm text-near-black/70 font-light mt-2">
                    <strong className="text-near-black">Retention:</strong> Session cookies (deleted when you close your browser) or up to 24 hours
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-light text-near-black mb-3 tracking-tight">
                  Analytics and Performance Cookies
                </h3>
                <p className="text-base text-near-black/70 font-light leading-relaxed mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <div className="bg-cream-100 p-4 space-y-3">
                  <p className="text-sm text-near-black/70 font-light">
                    <strong className="text-near-black">We use Google Analytics</strong> to collect website analytics data including pages visited, traffic sources, geographic location, device type, and navigation patterns.
                  </p>
                  <p className="text-sm text-near-black/70 font-light">
                    <strong className="text-near-black">Google Analytics Cookies:</strong>
                  </p>
                  <ul className="text-sm text-near-black/60 font-light ml-4 space-y-1">
                    <li>• _ga (expires after 2 years): Distinguishes unique users</li>
                    <li>• _gid (expires after 24 hours): Distinguishes users</li>
                    <li>• _gat (expires after 1 minute): Throttles request rate</li>
                  </ul>
                  <p className="text-sm text-near-black/70 font-light">
                    <strong className="text-near-black">Retention:</strong> Up to 26 months (Google Analytics default)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="third-party">
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              5. Third-Party Cookies
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>Some cookies on our website are placed by third-party services we use:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-4">
                  <thead className="bg-cream-100">
                    <tr>
                      <th className="text-left p-4 text-near-black font-light">Third Party</th>
                      <th className="text-left p-4 text-near-black font-light">Purpose</th>
                      <th className="text-left p-4 text-near-black font-light">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-cream-300">
                      <td className="p-4">Google Analytics</td>
                      <td className="p-4">Website analytics</td>
                      <td className="p-4">Analytics</td>
                    </tr>
                    <tr className="border-t border-cream-300">
                      <td className="p-4">Payment Processors</td>
                      <td className="p-4">Process transactions</td>
                      <td className="p-4">Essential</td>
                    </tr>
                    <tr className="border-t border-cream-300">
                      <td className="p-4">Hosting Provider</td>
                      <td className="p-4">Website hosting and CDN</td>
                      <td className="p-4">Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                We do not control these third-party cookies. Please review their privacy policies for more information.
              </p>
            </div>
          </section>

          <section id="manage-cookies">
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              6. How to Manage and Delete Cookies
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>
                You can control cookies through your browser settings. Most browsers allow you to block all cookies, block third-party cookies only, delete cookies after each browsing session, or set exceptions for specific websites.
              </p>
              <div className="bg-copper-50 p-6 my-6">
                <p className="text-near-black/80 font-light">
                  <strong className="text-near-black">Browser Settings for Popular Browsers:</strong>
                </p>
                <ul className="mt-3 space-y-2 ml-4">
                  <li>• <strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li>• <strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li>• <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
                  <li>• <strong>Opera:</strong> Settings → Privacy & Security → Cookies</li>
                </ul>
              </div>
              <p>
                <strong className="text-near-black">Opt out of Google Analytics:</strong> Install the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-copper-600 hover:text-copper-700 underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
              <p>
                <strong className="text-near-black">Impact of Disabling Cookies:</strong> If you disable cookies, some features may not work as expected, and you may need to re-enter preferences on each visit.
              </p>
            </div>
          </section>

          <section id="contact">
            <h2 className="font-playfair text-3xl font-light text-near-black mb-6 tracking-tight">
              7. Contact Us
            </h2>
            <div className="space-y-4 text-base text-near-black/70 font-light leading-relaxed">
              <p>If you have questions about our use of cookies or this Cookie Policy, please contact us:</p>
              <div className="p-6 bg-cream-100 space-y-2">
                <p className="text-near-black font-normal">The Astra Flow</p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:hello@theastroflow.com"
                    className="text-copper-600 hover:text-copper-700"
                  >
                    hello@theastroflow.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+233508688828" className="text-copper-600 hover:text-copper-700">
                    +233 50 868 8828
                  </a>
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
                href="/legal/terms-of-service"
                className="text-copper-600 hover:text-copper-700 transition-colors font-light underline"
              >
                Terms of Service
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
