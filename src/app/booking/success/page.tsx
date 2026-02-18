'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { CheckCircle2, Calendar, Loader2, AlertCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Force dynamic rendering - prevents static optimization that breaks useSearchParams
export const dynamic = 'force-dynamic';

interface SessionData {
  id: string;
  full_name: string;
  business_email: string;
  company_name: string;
  payment_reference: string;
  payment_amount: number;
  payment_currency: string;
  paid_at: string;
  booking_token_used: boolean;
  calendly_event_booked: boolean;
}

type PageState = 'loading' | 'valid' | 'invalid' | 'booked' | 'used' | 'expired';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const bookingToken = searchParams.get('token');

  const [session, setSession] = useState<SessionData | null>(null);
  const [pageState, setPageState] = useState<PageState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isBooked, setIsBooked] = useState(false);

  // Verify token on mount
  useEffect(() => {
    if (!sessionId || !bookingToken) {
      setPageState('invalid');
      setErrorMessage('Missing session ID or booking token. Please check your email for the booking link.');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `/api/book-strategy-session/verify-token?sessionId=${sessionId}&token=${bookingToken}`
        );

        const data = await response.json();

        if (!response.ok || !data.valid) {
          if (data.reason === 'Booking token already used' || data.reason === 'Calendly event already booked') {
            setPageState('used');
          } else if (data.reason === 'Booking token expired') {
            setPageState('expired');
          } else {
            setPageState('invalid');
          }
          setErrorMessage(data.reason || 'Invalid booking token');
          return;
        }

        setSession(data.session);
        setPageState('valid');

        // Track payment completed in GTM
        (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
          event: 'payment_completed',
          booking_session_id: sessionId,
          company_name: data.session?.company_name,
        });
      } catch (error) {
        console.error('[Success Page] Token verification error:', error);
        setPageState('invalid');
        setErrorMessage('Failed to verify booking token. Please contact support.');
      }
    };

    verifyToken();
  }, [sessionId, bookingToken]);

  // Listen for Calendly booking event
  useEffect(() => {
    const handleCalendlyEvent = async (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;

      if (e.data.event === 'calendly.event_scheduled') {
        console.log('[Success Page] Calendly event scheduled');

        // Extract event details from Calendly payload
        // NOTE: Embedded widget only provides URIs, not full details
        const payload = e.data.payload;

        // Mark token as used and send Email 2
        try {
          await fetch('/api/book-strategy-session/mark-token-used', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId,
              token: bookingToken,
              calendlyEvent: {
                eventUri: payload.event.uri,
                inviteeUri: payload.invitee.uri
              }
            }),
          });

          setIsBooked(true);
          setPageState('booked');

          // Track Calendly booking completed in GTM
          (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
            event: 'calendly_booking_completed',
            booking_session_id: sessionId,
          });
        } catch (error) {
          console.error('[Success Page] Failed to mark token as used:', error);
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [sessionId, bookingToken]);

  // Loading state
  if (pageState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-100 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto text-copper-500 animate-spin mb-4" />
          <p className="text-near-black text-lg">Verifying your booking token...</p>
        </div>
      </div>
    );
  }

  // Invalid/Used/Expired states
  if (pageState === 'invalid' || pageState === 'used' || pageState === 'expired') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-100 to-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center py-12">
          {pageState === 'used' ? (
            <>
              <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-8" strokeWidth={1.5} />
              <h1 className="text-3xl font-bold font-display uppercase text-near-black mb-6 tracking-brand-header">
                Already Booked
              </h1>
              <p className="text-near-black/50 mb-12 text-lg">
                You&apos;ve already scheduled your session. Check your email for confirmation details.
              </p>
            </>
          ) : pageState === 'expired' ? (
            <>
              <XCircle className="w-12 h-12 mx-auto text-orange-500 mb-8" strokeWidth={1.5} />
              <h1 className="text-3xl font-bold font-display uppercase text-near-black mb-6 tracking-brand-header">
                Booking Link Expired
              </h1>
              <p className="text-near-black/50 mb-4 text-lg">
                This booking link has expired (24-hour limit).
              </p>
              <p className="text-near-black/50 mb-12 text-base">
                Please contact support at <a href="mailto:hello@zerahq.com" className="text-copper-500 underline">hello@zerahq.com</a> to receive a new booking link.
              </p>
            </>
          ) : (
            <>
              <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-8" strokeWidth={1.5} />
              <h1 className="text-3xl font-bold font-display uppercase text-near-black mb-6 tracking-brand-header">
                Invalid Booking Link
              </h1>
              <p className="text-near-black/50 mb-12 text-lg">
                {errorMessage || 'This booking link is invalid or has been used.'}
              </p>
            </>
          )}
          <Button asChild variant="primary" size="default" className="w-fit mx-auto">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Valid state - show booking interface
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-100 to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative">
        {/* Success Header - Only show if not yet booked */}
        {!isBooked && pageState === 'valid' && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-8">
              <CheckCircle2 className="w-16 h-16 text-copper-500" strokeWidth={1.5} />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase text-near-black mb-6 tracking-brand-header">
              PAYMENT CONFIRMED
            </h1>

            <p className="text-xl sm:text-2xl text-near-black/60 mb-3">
              Thank you, <span className="text-copper-500">{session.full_name}</span>
            </p>

            <p className="text-base text-near-black/50 mb-8">
              {session.payment_currency} {Number(session.payment_amount || 0).toFixed(2)} processed successfully
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3">
              <span className="text-sm text-near-black/40 uppercase tracking-wider">Reference</span>
              <span className="text-sm font-mono text-copper-500">{session.payment_reference}</span>
            </div>
          </motion.div>
        )}

        {/* Booking Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {pageState === 'valid' && !isBooked ? (
            <>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-copper-500" strokeWidth={1.5} />
                  <h2 className="text-2xl font-bold font-display uppercase text-near-black tracking-brand-header">
                    Book Your Session
                  </h2>
                </div>
                <p className="text-base text-near-black/50">
                  Select a time for your 60-minute strategy consultation
                </p>
              </div>

              {/* Calendly Embed */}
              <div className="max-w-4xl mx-auto">
                <InlineWidget
                  url={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/zerahq/strategy-session'}
                  prefill={{
                    name: session.full_name,
                    email: session.business_email,
                    customAnswers: {
                      a1: session.company_name,
                      a2: session.payment_reference,
                    },
                  }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: true,
                    primaryColor: 'B87333',
                    textColor: '1a1a1a',
                  }}
                  styles={{
                    height: '700px',
                    width: '100%',
                  }}
                />
              </div>
            </>
          ) : pageState === 'booked' ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-8">
                <CheckCircle2 className="w-16 h-16 text-green-500" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase text-near-black mb-6 tracking-brand-header">
                Session Confirmed
              </h2>
              <p className="text-lg text-near-black/50 mb-4 max-w-2xl mx-auto">
                Your strategy session has been scheduled successfully
              </p>
              <p className="text-base text-near-black/40 max-w-xl mx-auto">
                Confirmation sent to <span className="text-copper-500">{session.business_email}</span>
              </p>
            </div>
          ) : null}
        </motion.div>

        {/* What's Next Section - Only show if not booked yet */}
        {pageState === 'valid' && !isBooked && (
          <motion.div
            className="bg-white border border-copper-500/30 rounded-sm p-6 sm:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold font-display uppercase text-near-black mb-4 tracking-brand-header">
              WHAT HAPPENS NEXT?
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-copper-500/20 flex items-center justify-center">
                  <span className="text-copper-500 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-near-black mb-1">
                    Confirmation Email
                  </h4>
                  <p className="text-sm text-near-black/70">
                    You&apos;ll receive a payment confirmation email at <span className="text-copper-500">{session.business_email}</span> within the next few minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-copper-500/20 flex items-center justify-center">
                  <span className="text-copper-500 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-near-black mb-1">
                    Pre-Call Audit
                  </h4>
                  <p className="text-sm text-near-black/70">
                    Our team will conduct a comprehensive analysis of your digital infrastructure. Findings will be shared during your strategy session.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-copper-500/20 flex items-center justify-center">
                  <span className="text-copper-500 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-near-black mb-1">
                    Strategy Session
                  </h4>
                  <p className="text-sm text-near-black/70">
                    Join the call at your scheduled time. We&apos;ll share findings, answer questions, and provide your custom roadmap.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-copper-500/20 flex items-center justify-center">
                  <span className="text-copper-500 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-near-black mb-1">
                    24-Hour Reminder
                  </h4>
                  <p className="text-sm text-near-black/70">
                    You&apos;ll receive a reminder email one day before your session with a prep checklist.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-near-black/60 mb-4">
            Questions or need to reschedule?
          </p>
          <Button asChild variant="ghost" size="default" className="w-fit mx-auto">
            <a href="mailto:hello@zerahq.com">Email Support</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
