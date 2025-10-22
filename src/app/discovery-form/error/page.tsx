'use client';

/**
 * Discovery Form Error Page
 * Displayed when form submission encounters an error
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Mail, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DiscoveryFormErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    // Get error details from URL params
    const error = searchParams.get('error');
    const id = searchParams.get('id');

    setErrorMessage(error);
    setSubmissionId(id);
  }, [searchParams]);

  const handleRetry = () => {
    if (submissionId) {
      // Return to form with saved data
      router.push(`/discovery-form?id=${submissionId}`);
    } else {
      // Start fresh
      router.push('/discovery-form');
    }
  };

  const handleStartFresh = () => {
    // Clear saved submission
    localStorage.removeItem('discoveryFormSubmissionId');
    router.push('/discovery-form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 md:p-12 lg:p-14 text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Submission Failed
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We encountered an issue while submitting your form.
            </p>
          </motion.div>

          {/* Error Details */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-8"
            >
              <p className="text-sm text-destructive font-mono">
                {errorMessage}
              </p>
            </motion.div>
          )}

          {/* What Went Wrong */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-foreground mb-3">
              Common Issues
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground text-left">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  <strong>Network Connection:</strong> Check your internet connection and try again
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  <strong>Session Expired:</strong> Your form session may have expired after being inactive for too long
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  <strong>Server Error:</strong> Our server may be experiencing temporary issues
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>
                  <strong>Invalid Data:</strong> Some form data may not have been saved correctly
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={handleRetry}
              className="w-fit mx-auto"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {submissionId ? 'Resume Form' : 'Try Again'}
            </Button>

            <Button
              onClick={handleStartFresh}
              variant="secondary"
              className="w-fit mx-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Fresh
            </Button>
          </motion.div>

          {/* Support Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-primary" />
              <p className="font-semibold text-foreground text-sm">
                Need Help?
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              If this problem persists, please contact us at{' '}
              <a
                href="mailto:hello@theastroflow.com"
                className="text-primary hover:underline"
              >
                hello@theastroflow.com
              </a>
              {submissionId && (
                <>
                  {' '}and include this reference ID:{' '}
                  <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                    {submissionId}
                  </span>
                </>
              )}
            </p>
          </motion.div>

          {/* Data Preservation Notice */}
          {submissionId && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-xs text-muted-foreground"
            >
              Your progress has been saved. Click "Resume Form" to continue where you left off.
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
