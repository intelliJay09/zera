'use client';

/**
 * Discovery Form Success Page
 * Confirmation page after successful form submission
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DiscoveryFormSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear saved submission ID from localStorage
    localStorage.removeItem('discoveryFormSubmissionId');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 md:p-12 lg:p-14 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your discovery form has been successfully submitted.
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              What Happens Next?
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground text-left">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary mt-0.5">1.</span>
                <span>
                  You'll receive a confirmation email shortly with a summary of your submission
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary mt-0.5">2.</span>
                <span>
                  Our team will review your requirements and prepare a custom proposal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary mt-0.5">3.</span>
                <span>
                  We'll contact you within 1-2 business days to discuss next steps
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary mt-0.5">4.</span>
                <span>
                  Once approved, we'll begin building your website (typically 7-14 days)
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={() => router.push('/')}
              className="w-fit mx-auto"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </motion.div>

          {/* Support Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Questions? Email us at{' '}
            <a
              href="mailto:hello@theastroflow.com"
              className="text-primary hover:underline"
            >
              hello@theastroflow.com
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
