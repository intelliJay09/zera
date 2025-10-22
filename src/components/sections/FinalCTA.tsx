'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative bg-gradient-to-br from-near-black via-[#0a0a0a] to-near-black py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient copper glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
              Ready to Begin?
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-playfair text-cream-200 tracking-tight leading-tight mb-6 sm:mb-8">
              Let&apos;s Build Your
              <span className="block text-copper-500">Growth Story</span>
            </h2>
            <p className="text-base sm:text-lg font-light text-light-gray leading-relaxed mb-12">
              Choose your path: quick-start website packages or strategic custom partnerships. Both paths lead to growth—just in different ways.
            </p>

            {/* Dual CTAs */}
            <div className="space-y-6">
              {/* WaaS CTA */}
              <div className="group relative bg-white/5 backdrop-blur-sm border border-copper-500/20 hover:border-copper-500/40 p-8 rounded-sm transition-all duration-500 hover:bg-white/10">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-light font-playfair text-cream-200 mb-3 tracking-tight">
                      Website as a Service
                    </h3>
                    <p className="text-sm font-light text-light-gray/70 leading-relaxed mb-4">
                      Launch your business online in 14 days with transparent monthly plans starting at $299/mo.
                    </p>
                    <Link
                      href="/waas-plans"
                      className="inline-flex items-center gap-2 text-copper-500 hover:gap-4 transition-all duration-300 font-medium text-sm tracking-wide"
                    >
                      <span>View WaaS Plans</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Solutions CTA */}
              <div className="group relative bg-white/5 backdrop-blur-sm border border-copper-500/20 hover:border-copper-500/40 p-8 rounded-sm transition-all duration-500 hover:bg-white/10">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-light font-playfair text-cream-200 mb-3 tracking-tight">
                      Digital Marketing Solutions
                    </h3>
                    <p className="text-sm font-light text-light-gray/70 leading-relaxed mb-4">
                      Comprehensive services including SEO, social media, web development, branding, and content marketing.
                    </p>
                    <Link
                      href="/solutions"
                      className="inline-flex items-center gap-2 text-copper-500 hover:gap-4 transition-all duration-300 font-medium text-sm tracking-wide"
                    >
                      <span>Explore Our Solutions</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-copper-500/10 via-transparent to-transparent rounded-sm blur-xl" />

            <div className="relative bg-white/5 backdrop-blur-sm border border-copper-500/20 rounded-sm p-6 sm:p-8 lg:p-10">
              {submitStatus === 'success' ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-copper-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-copper-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal font-montserrat text-cream-200 mb-2 sm:mb-3 tracking-wide">
                    Thank You!
                  </h3>
                  <p className="text-sm sm:text-base font-light text-light-gray leading-relaxed">
                    We&apos;ve received your inquiry and will respond within 24 hours with strategic
                    insights tailored to your business.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-cream-200 mb-2 tracking-wide"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-cream-200 placeholder-light-gray/50 focus:outline-none focus:border-copper-500/60 transition-colors duration-300"
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-cream-200 mb-2 tracking-wide"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-cream-200 placeholder-light-gray/50 focus:outline-none focus:border-copper-500/60 transition-colors duration-300"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-cream-200 mb-2 tracking-wide"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-cream-200 placeholder-light-gray/50 focus:outline-none focus:border-copper-500/60 transition-colors duration-300"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-cream-200 mb-2 tracking-wide"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-cream-200 placeholder-light-gray/50 focus:outline-none focus:border-copper-500/60 transition-colors duration-300"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-cream-200 mb-2 tracking-wide"
                    >
                      Tell us about your goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-cream-200 placeholder-light-gray/50 focus:outline-none focus:border-copper-500/60 transition-colors duration-300 resize-none"
                      placeholder="What are your biggest marketing challenges? What growth objectives are you targeting?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-copper-500 hover:bg-copper-600 text-cream-200 font-medium text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 hover:gap-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Schedule Strategy Call
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs font-light text-light-gray/60 text-center tracking-wide">
                    By submitting, you agree to our privacy policy. We respect your data and never
                    share it with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
