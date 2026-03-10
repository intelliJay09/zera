'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, AlertCircle, Loader2, Lock } from 'lucide-react';
import { submitLeadForm } from './actions';
import type { LeadFormState } from './actions';

// ============================================================
// SUBMIT BUTTON (isolated so useFormStatus works correctly)
// ============================================================

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-copper-500 hover:bg-copper-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs tracking-[0.15em] uppercase py-4 mt-2 transition-all duration-300 flex items-center justify-center gap-3 group"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Architecting...
        </>
      ) : (
        <>
          Request Infrastructure Diagnostic
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </>
      )}
    </button>
  );
}

// ============================================================
// CONSTANTS
// ============================================================

const LEAKS = [
  {
    number: '01',
    title: 'The 8-Second Death Trap',
    subtitle:
      'Why your site speed is silently destroying your ad ROI — and why WordPress is the primary culprit in Accra.',
  },
  {
    number: '02',
    title: 'The Data Black Hole',
    subtitle:
      'How broken lead routing corrupts your Pixel, inflates your CPCs, and trains the algorithm on the wrong people.',
  },
  {
    number: '03',
    title: 'The Follow-Up Fatigue',
    subtitle:
      'Why your competitor closes your leads while your team sleeps — and the automated infrastructure that ends it.',
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function GhanaAuditContent() {
  const [state, action] = useActionState<LeadFormState, FormData>(
    submitLeadForm,
    null
  );

  return (
    <main className="min-h-screen bg-near-black">
      {/* ============================================================ */}
      {/* HERO + FORM SECTION                                           */}
      {/* ============================================================ */}
      <section className="relative pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-copper-500/10 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="grid lg:grid-cols-[1fr_460px] gap-16 lg:gap-20 items-start">

            {/* ——— LEFT: Headline + Proof ——— */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7 }}
            >
              {/* Classified badge */}
              <div className="inline-flex items-center gap-2.5 border border-copper-500/40 px-4 py-2 mb-10">
                <div className="w-1.5 h-1.5 rounded-full bg-copper-500 animate-pulse flex-shrink-0" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-copper-500">
                  CLASSIFIED — CEO LEVEL REVIEW ONLY
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold font-display uppercase text-white tracking-brand-header leading-[1.05] mb-6">
                3 SILENT LEAKS ARE<br />
                BURNING{' '}
                <span className="text-copper-500">GHS 28K–108K</span><br />
                OF YOUR AD BUDGET<br />
                EVERY MONTH.
              </h1>

              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
                The 2026 Ghana Executive Audit documents the exact infrastructure
                failures destroying 40% of ad spend across Accra&rsquo;s mid-market
                operators — and the precision fix for each one.
              </p>

              {/* Stats strip */}
              <div className="grid grid-cols-3 border border-white/10 mb-14">
                <div className="px-5 py-5 border-r border-white/10">
                  <p className="text-3xl font-bold text-copper-500 mb-1.5">40%</p>
                  <p className="text-xs text-white/40 uppercase tracking-brand-label leading-tight">
                    Ad Spend<br />Destroyed
                  </p>
                </div>
                <div className="px-5 py-5 border-r border-white/10">
                  <p className="text-3xl font-bold text-copper-500 mb-1.5">3</p>
                  <p className="text-xs text-white/40 uppercase tracking-brand-label leading-tight">
                    Documented<br />Leaks
                  </p>
                </div>
                <div className="px-5 py-5">
                  <p className="text-3xl font-bold text-copper-500 mb-1.5">GHS 47</p>
                  <p className="text-xs text-white/40 uppercase tracking-brand-label leading-tight">
                    Max CPC<br />Documented
                  </p>
                </div>
              </div>

              {/* Leaks preview */}
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-5">
                WHAT&rsquo;S INSIDE
              </p>
              <div className="space-y-3">
                {LEAKS.map((leak, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-5 bg-white/[0.03] border border-white/10 p-5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-sm font-bold tracking-[0.15em] text-copper-500/50 mt-0.5 flex-shrink-0 w-6">
                      {leak.number}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                        {leak.title}
                      </p>
                      <p className="text-xs text-white/45 leading-relaxed">
                        {leak.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-xs text-white/25 leading-relaxed">
                For businesses generating over GHS 50,000/month running active
                paid acquisition in Accra.
              </p>
            </motion.div>

            {/* ——— RIGHT: Form Card ——— */}
            <motion.div
              className="lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="border border-copper-500/30 bg-white/[0.03] p-8 sm:p-10">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-copper-500 mb-2">
                  FREE DOWNLOAD
                </p>
                <h2 className="text-xl sm:text-2xl font-bold font-display uppercase text-white tracking-brand-header leading-tight mb-2">
                  Download The 2026<br />Ghana Executive Audit
                </h2>
                <p className="text-sm text-white/45 leading-relaxed mb-8">
                  Enter your details. Your copy arrives immediately.
                </p>

                {/* Error banner */}
                <AnimatePresence>
                  {state?.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 p-4 mb-6"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400">{state.error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form action={action} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      autoComplete="name"
                      required
                      className="w-full bg-white/[0.05] border border-white/15 focus:border-copper-500/60 focus:outline-none text-white placeholder:text-white/20 text-sm px-4 py-3.5 transition-colors duration-200"
                    />
                    {state?.fieldErrors?.name && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {state.fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                      className="w-full bg-white/[0.05] border border-white/15 focus:border-copper-500/60 focus:outline-none text-white placeholder:text-white/20 text-sm px-4 py-3.5 transition-colors duration-200"
                    />
                    {state?.fieldErrors?.email && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {state.fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-2"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+233 50 000 0000"
                      autoComplete="tel"
                      required
                      className="w-full bg-white/[0.05] border border-white/15 focus:border-copper-500/60 focus:outline-none text-white placeholder:text-white/20 text-sm px-4 py-3.5 transition-colors duration-200"
                    />
                    {state?.fieldErrors?.phone && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {state.fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Industries Ltd"
                      autoComplete="organization"
                      required
                      className="w-full bg-white/[0.05] border border-white/15 focus:border-copper-500/60 focus:outline-none text-white placeholder:text-white/20 text-sm px-4 py-3.5 transition-colors duration-200"
                    />
                    {state?.fieldErrors?.company && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {state.fieldErrors.company}
                      </p>
                    )}
                  </div>

                  <SubmitButton />
                </form>

                {/* Trust signal */}
                <div className="flex items-center justify-center gap-2 mt-5">
                  <Lock className="w-3 h-3 text-white/25 flex-shrink-0" />
                  <p className="text-xs text-white/25">
                    Your information is private. No spam.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BOTTOM CTA STRIP                                              */}
      {/* ============================================================ */}
      <section className="relative border-t border-white/10 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-copper-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-copper-500 mb-1">
                AFTER READING THE AUDIT
              </p>
              <p className="text-base text-white/70">
                The next step is calculating your exact capital recovery potential.
              </p>
            </div>
            <Link
              href="/growth-audit"
              className="group inline-flex items-center gap-3 bg-transparent border border-copper-500/40 hover:border-copper-500 text-copper-500 hover:text-white hover:bg-copper-500 text-xs font-bold tracking-[0.15em] uppercase px-7 py-4 transition-all duration-300 flex-shrink-0 w-fit"
            >
              Request Infrastructure Diagnostic
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
