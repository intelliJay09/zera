'use client';

import { useState } from 'react';
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

      // Push lead form event to GTM dataLayer
      (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
        event: 'lead_form_submitted',
        form_location: 'homepage_final_cta',
        company_name: formData.company,
      });

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
            <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-6 text-center lg:text-left">
              The Executive Diagnostic
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-display uppercase text-cream-200 tracking-brand-header leading-tight mb-6 sm:mb-8 text-center lg:text-left">
              Your Revenue Infrastructure
              <span className="block text-copper-500">Is Leaking.</span>
            </h2>
            <p className="text-base sm:text-lg font-normal text-light-gray leading-relaxed mb-12 text-center lg:text-left">
              We engineer precision diagnostics. 60 minutes to identify the failure points in your growth architecture—then deploy the fix protocol.
            </p>

            {/* What You Get */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Digital HQ Infrastructure Audit</h3>
                  <p className="text-sm text-light-gray/70">Core Web Vitals analysis, conversion physics diagnosis, and revenue leak identification</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Search Authority Diagnostic</h3>
                  <p className="text-sm text-light-gray/70">Entity mapping, schema architecture gaps, and organic visibility failure points</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Lead Capture Protocol Review</h3>
                  <p className="text-sm text-light-gray/70">CRM integration status, automation infrastructure, and pipeline efficiency analysis</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Traffic Quality Assessment</h3>
                  <p className="text-sm text-light-gray/70">Source integrity verification, visitor qualification metrics, and growth ceiling analysis</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">The Fix Protocol</h3>
                  <p className="text-sm text-light-gray/70">Priority-ranked implementation roadmap with projected revenue impact per intervention</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-copper-500/10 via-copper-500/5 to-transparent rounded-sm blur-3xl" />

            <div className="relative bg-[#2a2a2a] border border-copper-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm p-6 sm:p-8 lg:p-10">
              {submitStatus === 'success' ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-copper-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-copper-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal font-montserrat text-cream-200 mb-2 sm:mb-3 tracking-normal">
                    Request Received!
                  </h3>
                  <p className="text-sm sm:text-base font-normal text-light-gray leading-relaxed">
                    We&apos;ll review your business details and send you payment instructions for the strategy session within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-cream-200 mb-2 tracking-normal"
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
                        className="block text-sm font-medium text-cream-200 mb-2 tracking-normal"
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
                        className="block text-sm font-medium text-cream-200 mb-2 tracking-normal"
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
                      className="block text-sm font-medium text-cream-200 mb-2 tracking-normal"
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
                      className="block text-sm font-medium text-cream-200 mb-2 tracking-normal"
                    >
                      What&apos;s broken in your revenue infrastructure?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-cream-200 placeholder-light-gray/50 focus:outline-none focus:border-copper-500/60 transition-colors duration-300 resize-none"
                      placeholder="Describe your biggest challenges: slow site speed, low conversion rates, SEO issues, lead generation problems, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-copper-600 hover:bg-copper-700 text-cream-200 font-medium text-sm tracking-brand-label uppercase px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center gap-3 hover:gap-5 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Book Strategy Session
                        <ArrowRight className="w-5 h-5 flex-shrink-0" />
                      </>
                    )}
                  </button>

                  <p className="text-xs font-normal text-light-gray/60 text-center tracking-normal">
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
