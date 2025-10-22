'use client';

/**
 * Checkout Page
 * Payment form for WaaS plan subscription
 */

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2, XCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPlanById, type WaaSPlan } from '@/data/waas-pricing';
import AnimatedCheckIcon from '@/components/animations/AnimatedCheckIcon';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Form validation schema
const checkoutSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service',
  }),
  agreedToSla: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the SLA Agreement',
  }),
  currency: z.enum(['GHS', 'USD']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedPlan, setSelectedPlan] = useState<WaaSPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      planId: '',
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      agreedToTerms: false,
      agreedToSla: false,
      currency: 'GHS' as const,
    },
  });

  const selectedCurrency = watch('currency');

  // Load plan from URL params
  useEffect(() => {
    const planId = searchParams.get('plan');
    if (planId) {
      const plan = getPlanById(planId);
      if (plan) {
        setSelectedPlan(plan);
        setValue('planId', plan.id);
      } else {
        setError('Invalid plan selected');
      }
    } else {
      setError('No plan selected');
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Initialize payment
      const response = await fetch('/api/checkout/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Payment initialization failed');
      }

      // Redirect to Paystack payment page
      window.location.href = result.data.authorizationUrl;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-200 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center relative z-10">
          <motion.div
            initial={prefersReducedMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-6"
          >
            {error ? (
              <XCircle className="h-16 w-16 text-copper-500 mx-auto" />
            ) : (
              <Loader2 className="h-16 w-16 text-copper-500 animate-spin mx-auto" />
            )}
          </motion.div>
          <p className="text-xl font-light font-playfair text-near-black tracking-wide">
            {error || 'Loading plan details...'}
          </p>
          {error && (
            <Button
              onClick={() => router.push('/waas-plans')}
              variant="primary"
              className="mt-8 uppercase tracking-[0.15em] text-sm"
            >
              Return to Plans
            </Button>
          )}
        </div>
      </div>
    );
  }

  const planPrice = selectedPlan.price.monthly[selectedCurrency];
  const currencySymbol = selectedCurrency === 'GHS' ? '₵' : '$';

  return (
    <div className="min-h-screen bg-cream-200 px-4 relative overflow-hidden pb-12">
      {/* Decorative blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-12 text-center"
        >
          <p className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-4">
            Secure Checkout
          </p>
          <h1 className="text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight mb-4">
            Complete Your Subscription
          </h1>
          <p className="text-lg font-light text-near-black/70 tracking-wide">
            You're one step away from your professional website
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Summary Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-white to-cream-100 backdrop-blur-sm p-8 sticky top-24 shadow-lg">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
                Selected Plan
              </p>
              <div className="mb-8">
                <h3 className="text-2xl font-light font-playfair text-near-black mb-2 tracking-tight">
                  {selectedPlan.name}
                </h3>
                <p className="text-sm font-light text-near-black/60 tracking-wide">
                  {selectedPlan.tagline}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-copper-500/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light font-playfair text-copper-500">
                    {currencySymbol}
                    {planPrice.toLocaleString()}
                  </span>
                  <span className="text-base font-light text-near-black/60 tracking-wide">
                    /month
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {selectedPlan.features.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-3">
                      {category.category}
                    </h4>
                    <ul className="space-y-3">
                      {category.items.slice(0, 3).map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-3"
                        >
                          <AnimatedCheckIcon
                            className="w-5 h-5 text-copper-500 flex-shrink-0 mt-0.5"
                            strokeWidth={1.5}
                            delay={0.2 + idx * 0.1 + itemIdx * 0.05}
                          />
                          <span className="text-sm font-light text-near-black/80 leading-relaxed tracking-wide">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-white to-cream-100 backdrop-blur-sm p-10 shadow-lg">
              <h2 className="text-3xl font-light font-playfair text-near-black tracking-tight mb-8">
                Your Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Currency Selection */}
                <div>
                  <Label
                    htmlFor="currency"
                    className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-3 block"
                  >
                    Payment Currency
                  </Label>
                  <select
                    id="currency"
                    {...register('currency')}
                    className="w-full px-6 py-5 bg-white/80 border border-cream-300 focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all duration-300 font-light text-near-black tracking-wide appearance-none"
                    style={{ minHeight: '56px' }}
                  >
                    <option value="GHS">Ghanaian Cedis (₵)</option>
                    <option value="USD">US Dollars ($)</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="fullName"
                      className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-3 block"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      placeholder="John Doe"
                      className="px-6 py-4 bg-white/80 border-cream-300 focus:border-copper-500 focus:ring-copper-500/20 font-light text-near-black tracking-wide"
                    />
                    {errors.fullName && (
                      <p className="text-copper-700 text-sm mt-2 font-light tracking-wide">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="businessName"
                      className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-3 block"
                    >
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      {...register('businessName')}
                      placeholder="Your Business Ltd."
                      className="px-6 py-4 bg-white/80 border-cream-300 focus:border-copper-500 focus:ring-copper-500/20 font-light text-near-black tracking-wide"
                    />
                    {errors.businessName && (
                      <p className="text-copper-700 text-sm mt-2 font-light tracking-wide">
                        {errors.businessName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-3 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="john@business.com"
                      className="px-6 py-4 bg-white/80 border-cream-300 focus:border-copper-500 focus:ring-copper-500/20 font-light text-near-black tracking-wide"
                    />
                    {errors.email && (
                      <p className="text-copper-700 text-sm mt-2 font-light tracking-wide">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-3 block"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="+233 XX XXX XXXX"
                      className="px-6 py-4 bg-white/80 border-cream-300 focus:border-copper-500 focus:ring-copper-500/20 font-light text-near-black tracking-wide"
                    />
                    {errors.phone && (
                      <p className="text-copper-700 text-sm mt-2 font-light tracking-wide">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Legal Agreements */}
                <div className="space-y-4 pt-8 border-t border-copper-500/10">
                  <div className="flex items-start gap-4">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="agreedToTerms"
                        {...register('agreedToTerms')}
                        className="peer h-5 w-5 appearance-none border-2 border-cream-300 bg-white/80 checked:bg-copper-500 checked:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all duration-300 cursor-pointer"
                      />
                      <svg
                        className="absolute w-5 h-5 pointer-events-none hidden peer-checked:block text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <label
                      htmlFor="agreedToTerms"
                      className="text-sm font-light text-near-black/80 tracking-wide cursor-pointer"
                    >
                      I agree to The Astra Flow{' '}
                      <a
                        href="/terms"
                        target="_blank"
                        className="text-copper-500 hover:text-copper-600 transition-colors duration-300"
                      >
                        Terms of Service
                      </a>
                    </label>
                  </div>
                  {errors.agreedToTerms && (
                    <p className="text-copper-700 text-sm ml-9 font-light tracking-wide">
                      {errors.agreedToTerms.message}
                    </p>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="agreedToSla"
                        {...register('agreedToSla')}
                        className="peer h-5 w-5 appearance-none border-2 border-cream-300 bg-white/80 checked:bg-copper-500 checked:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all duration-300 cursor-pointer"
                      />
                      <svg
                        className="absolute w-5 h-5 pointer-events-none hidden peer-checked:block text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <label
                      htmlFor="agreedToSla"
                      className="text-sm font-light text-near-black/80 tracking-wide cursor-pointer"
                    >
                      I agree to the WaaS{' '}
                      <a
                        href="/sla"
                        target="_blank"
                        className="text-copper-500 hover:text-copper-600 transition-colors duration-300"
                      >
                        Service Level Agreement
                      </a>
                    </label>
                  </div>
                  {errors.agreedToSla && (
                    <p className="text-copper-700 text-sm ml-9 font-light tracking-wide">
                      {errors.agreedToSla.message}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-copper-50 border border-copper-300 text-copper-700 px-6 py-4 flex items-start gap-4"
                  >
                    <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-light tracking-wide">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  className="pt-4 flex justify-center md:justify-start"
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: -2,
                          transition: { duration: 0.3 },
                        }
                  }
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    size="lg"
                    className="w-fit px-10 py-6 text-sm uppercase tracking-[0.15em] group"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        Pay {currencySymbol}
                        {planPrice.toLocaleString()}
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
