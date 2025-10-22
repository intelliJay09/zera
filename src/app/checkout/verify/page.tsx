'use client';

/**
 * Payment Verification Page
 * Handles Paystack redirect and verifies payment
 */

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type VerificationStatus = 'verifying' | 'success' | 'failed';

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');

      if (!reference) {
        setStatus('failed');
        setError('No payment reference found');
        return;
      }

      try {
        const response = await fetch(`/api/checkout/verify?reference=${reference}`);
        const result = await response.json();

        if (result.success) {
          setStatus('success');
          setPaymentData(result.data);
          // Redirect to success page after 2 seconds
          setTimeout(() => {
            router.push(`/checkout/success?ref=${reference}`);
          }, 2000);
        } else {
          setStatus('failed');
          setError(result.error || 'Payment verification failed');
        }
      } catch (err: any) {
        setStatus('failed');
        setError(err.message || 'An unexpected error occurred');
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center"
      >
        {status === 'verifying' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mb-6"
            >
              <Loader2 className="h-16 w-16 text-primary mx-auto" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="mb-6"
            >
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Your payment has been confirmed. Redirecting you now...
            </p>
            {paymentData && (
              <div className="bg-primary/5 rounded-lg p-4 text-left">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Amount Paid:</span>{' '}
                  {paymentData.currency === 'GHS' ? '₵' : '$'}
                  {paymentData.amount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-semibold">Reference:</span>{' '}
                  {paymentData.reference}
                </p>
              </div>
            )}
          </>
        )}

        {status === 'failed' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="mb-6"
            >
              <XCircle className="h-16 w-16 text-destructive mx-auto" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'We could not verify your payment. Please try again.'}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => router.push('/waas-plans')}
                variant="secondary"
              >
                Return to Plans
              </Button>
              <Button onClick={() => router.push('/contact')}>
                Contact Support
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
