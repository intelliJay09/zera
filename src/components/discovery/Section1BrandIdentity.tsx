'use client';

/**
 * Section 1: Brand Identity
 * Collects business branding information
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RepeaterField from '@/components/forms/RepeaterField';

// Helper function to normalize URLs
const normalizeUrl = (url: string): string => {
  if (!url) return '';

  // Remove whitespace
  url = url.trim();

  // If already has protocol, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Add https:// if missing
  return `https://${url}`;
};

// Helper function to build social URL from handle
const buildSocialUrl = (platform: string, handle: string): string => {
  if (!handle) return '';

  // Remove @ if present
  handle = handle.replace('@', '').trim();

  const baseUrls: Record<string, string> = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
    tiktok: 'https://tiktok.com/@',
    youtube: 'https://youtube.com/@',
  };

  return baseUrls[platform] ? baseUrls[platform] + handle : '';
};

// Validation schema
const section1Schema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  business_name: z.string().trim().min(2, 'Business name must be at least 2 characters'),
  business_tagline: z.string().trim().optional(),
  social_links: z.array(
    z.object({
      platform: z.string().min(1, 'Please select a platform'),
      handle: z.string().trim().min(1, 'Please enter your handle'),
      url: z.string().url().optional(), // Generated from handle
    })
  ).optional(),
  brand_style: z
    .string()
    .trim()
    .min(10, 'Please describe your brand style (at least 10 characters)')
    .max(200, 'Brand style description too long (max 200 characters)'),
  inspiration_sites: z.object({
    site1: z.string().trim().min(1, 'Please enter a website').transform(normalizeUrl),
    site2: z.string().trim().min(1, 'Please enter a website').transform(normalizeUrl),
  }),
  main_goal: z.string().min(1, 'Please select your main website goal'),
});

export type Section1Data = z.infer<typeof section1Schema>;

interface Section1Props {
  initialData?: Partial<Section1Data>;
  onNext: (data: Section1Data) => void;
  onSave: (data: Partial<Section1Data>) => void;
}

const socialPlatforms = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Twitter/X', value: 'twitter' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'YouTube', value: 'youtube' },
];

const websiteGoals = [
  { label: 'Get phone calls from customers', value: 'call' },
  { label: 'Receive contact form submissions', value: 'contact_form' },
  { label: 'Showcase portfolio/work', value: 'portfolio' },
  { label: 'Provide information about services', value: 'information' },
  { label: 'Sell products online', value: 'sell_products' },
];

export default function Section1BrandIdentity({
  initialData,
  onNext,
  onSave,
}: Section1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<Section1Data>({
    resolver: zodResolver(section1Schema),
    defaultValues: initialData || {
      email: '',
      business_name: '',
      business_tagline: '',
      social_links: [],
      brand_style: '',
      inspiration_sites: { site1: '', site2: '' },
      main_goal: '',
    },
  });

  const socialLinks = watch('social_links');

  const handleFormSubmit = async (data: Section1Data) => {
    onNext(data);
  };

  const handleAutoSave = async () => {
    const data = watch();
    onSave(data);
  };

  return (
    <form id="section-1-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Email Address */}
      <div>
        <Label htmlFor="email">
          Your Email Address <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          We'll use this to save your progress and send you updates
        </p>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className="mt-1.5"
          onBlur={handleAutoSave}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Business Name */}
      <div>
        <Label htmlFor="business_name">
          Official Business Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="business_name"
          {...register('business_name')}
          placeholder="The Astra Flow"
          className="mt-1.5"
          onBlur={handleAutoSave}
        />
        {errors.business_name && (
          <p className="text-destructive text-sm mt-1">
            {errors.business_name.message}
          </p>
        )}
      </div>

      {/* Business Tagline */}
      <div>
        <Label htmlFor="business_tagline">Business Tagline (Optional)</Label>
        <Input
          id="business_tagline"
          {...register('business_tagline')}
          placeholder="Elevate Your Digital Presence"
          className="mt-1.5"
          onBlur={handleAutoSave}
        />
        {errors.business_tagline && (
          <p className="text-destructive text-sm mt-1">
            {errors.business_tagline.message}
          </p>
        )}
      </div>

      {/* Social Media Links */}
      <div>
        <Label className="mb-3 block">Social Media Links (Optional)</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Just enter your username/handle (e.g., "yourpage" or "@yourpage")
        </p>
        <RepeaterField
          name="social_links"
          fields={[
            {
              name: 'platform',
              type: 'select',
              label: 'Platform',
              options: socialPlatforms,
              required: true,
            },
            {
              name: 'handle',
              type: 'text',
              label: 'Handle/Username',
              placeholder: 'yourhandle',
              required: true,
            },
          ]}
          addButtonText="Add Social Profile"
          max={6}
          value={socialLinks || []}
          onChange={(value) => {
            // Auto-generate URLs from handles
            const withUrls = value.map((link: any) => ({
              ...link,
              url: link.platform && link.handle ? buildSocialUrl(link.platform, link.handle) : '',
            }));
            setValue('social_links', withUrls as any);
            handleAutoSave();
          }}
        />
      </div>

      {/* Brand Style */}
      <div>
        <Label htmlFor="brand_style">
          Brand Style Description <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Describe your brand in a few words (e.g., "Modern, minimalist,
          professional")
        </p>
        <Textarea
          id="brand_style"
          {...register('brand_style')}
          placeholder="Professional, elegant, trustworthy, innovative"
          className="mt-1.5"
          rows={3}
          onBlur={handleAutoSave}
        />
        {errors.brand_style && (
          <p className="text-destructive text-sm mt-1">
            {errors.brand_style.message}
          </p>
        )}
      </div>

      {/* Inspiration Websites */}
      <div>
        <Label className="mb-3 block">
          Inspiration Websites <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-4">
          Share 2 websites whose design you admire (e.g., "example.com" or "www.example.com")
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="inspiration_site1">Website 1</Label>
            <Input
              id="inspiration_site1"
              {...register('inspiration_sites.site1')}
              placeholder="example.com"
              className="mt-1.5"
              onBlur={handleAutoSave}
            />
            {errors.inspiration_sites?.site1 && (
              <p className="text-destructive text-sm mt-1">
                {errors.inspiration_sites.site1.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="inspiration_site2">Website 2</Label>
            <Input
              id="inspiration_site2"
              {...register('inspiration_sites.site2')}
              placeholder="example.com"
              className="mt-1.5"
              onBlur={handleAutoSave}
            />
            {errors.inspiration_sites?.site2 && (
              <p className="text-destructive text-sm mt-1">
                {errors.inspiration_sites.site2.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Website Goal */}
      <div>
        <Label htmlFor="main_goal">
          Main Website Goal <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          What is the primary purpose of your website?
        </p>
        <select
          id="main_goal"
          {...register('main_goal')}
          className="w-full mt-1.5 px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          onChange={(e) => {
            register('main_goal').onChange(e);
            handleAutoSave();
          }}
          onBlur={handleAutoSave}
        >
          <option value="">Select your main goal</option>
          {websiteGoals.map((goal) => (
            <option key={goal.value} value={goal.value}>
              {goal.label}
            </option>
          ))}
        </select>
        {errors.main_goal && (
          <p className="text-destructive text-sm mt-1">
            {errors.main_goal.message}
          </p>
        )}
      </div>
    </form>
  );
}
