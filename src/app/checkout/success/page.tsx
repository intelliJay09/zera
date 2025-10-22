'use client';

/**
 * Checkout Success Page
 * Confirms successful payment and provides next steps
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Mail,
  FileText,
  Calendar,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');
    setReference(ref);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-6 relative"
          >
            <div className="absolute -inset-10 bg-copper-500/20 rounded-full blur-3xl" />
            <CheckCircle2 className="h-24 w-24 text-copper-500 mx-auto relative" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight mb-4"
          >
            Payment Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-light text-near-black/70 tracking-wide mb-2"
          >
            Thank you for choosing The Astra Flow
          </motion.p>

          {reference && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-light text-near-black/60 tracking-wide"
            >
              Reference: <span className="font-mono">{reference}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Next Steps Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-white to-cream-100 backdrop-blur-sm p-6 md:p-8 mb-8 shadow-lg"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <Sparkles className="h-6 w-6 text-copper-500 mb-3" />
            <h2 className="text-xl md:text-2xl font-light font-playfair text-near-black tracking-tight">What Happens Next</h2>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="flex flex-col items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-copper-500/10 flex items-center justify-center mb-3">
                  <span className="text-copper-500 font-semibold text-lg">1</span>
                </div>
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Mail className="h-5 w-5 text-copper-500" />
                  <h3 className="font-semibold text-base md:text-lg text-near-black tracking-wide">Check Your Email</h3>
                </div>
              </div>
              <p className="font-light text-sm md:text-base text-near-black/70 tracking-wide max-w-2xl mx-auto">
                We've sent you a confirmation email with your subscription
                details and a link to complete your website discovery form.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="flex flex-col items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-copper-500/10 flex items-center justify-center mb-3">
                  <span className="text-copper-500 font-semibold text-lg">2</span>
                </div>
                <div className="flex items-center gap-2 justify-center mb-2">
                  <FileText className="h-5 w-5 text-copper-500" />
                  <h3 className="font-semibold text-base md:text-lg text-near-black tracking-wide">
                    Complete Discovery Form
                  </h3>
                </div>
              </div>
              <p className="font-light text-sm md:text-base text-near-black/70 tracking-wide mb-4 max-w-2xl mx-auto">
                Share your vision, brand details, content, and preferences
                through our comprehensive discovery form.
              </p>
              <Link href="/discovery-form">
                <Button variant="primary" className="w-fit text-sm md:text-base whitespace-nowrap">
                  Start Discovery Form
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <div className="flex flex-col items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-copper-500/10 flex items-center justify-center mb-3">
                  <span className="text-copper-500 font-semibold text-lg">3</span>
                </div>
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Calendar className="h-5 w-5 text-copper-500" />
                  <h3 className="font-semibold text-base md:text-lg text-near-black tracking-wide">We Build Your Site</h3>
                </div>
              </div>
              <p className="font-light text-sm md:text-base text-near-black/70 tracking-wide max-w-2xl mx-auto">
                Our team will review your submission within 24 hours and start
                building your professional website. You'll receive regular
                updates throughout the process.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-br from-white to-cream-100 backdrop-blur-sm p-6 md:p-8 shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-light font-playfair text-near-black tracking-tight mb-4">Estimated Timeline</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center gap-4">
              <span className="font-light text-sm md:text-base text-near-black/70 tracking-wide">Discovery Form Review</span>
              <span className="font-semibold text-sm md:text-base text-near-black whitespace-nowrap">Within 24 hours</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="font-light text-sm md:text-base text-near-black/70 tracking-wide">Domain Confirmation</span>
              <span className="font-semibold text-sm md:text-base text-near-black whitespace-nowrap">1-2 days</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="font-light text-sm md:text-base text-near-black/70 tracking-wide">Design Mockups Ready</span>
              <span className="font-semibold text-sm md:text-base text-near-black whitespace-nowrap">3-5 days</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="font-light text-sm md:text-base text-near-black/70 tracking-wide">Website Launch</span>
              <span className="font-bold text-sm md:text-base text-copper-500 whitespace-nowrap">14 days</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-12"
        >
          <p className="font-light text-sm md:text-base text-near-black/70 tracking-wide mb-4">
            Have questions? We're here to help!
          </p>
          <Link href="/contact-us">
            <Button variant="secondary" className="w-fit text-sm md:text-base hover:bg-copper-500 hover:text-white hover:border-copper-500 transition-all duration-300 ease-out">
              Contact Support
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
