'use client';

/**
 * Section 3: Website Content
 * Collects content for all website pages (tabbed interface)
 * Updated: Files & Assets moved to dedicated tab with shared folder link
 */

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import RepeaterField from '@/components/forms/RepeaterField';
import FolderGuide from './FolderGuide';

// Base schema for type inference
const baseSection3Schema = z.object({
  homepage_headline: z.string(),
  homepage_intro: z.string(),
  about_headline: z.string(),
  about_description: z.string(),
  offerings_headline: z.string().optional(),
  offerings_list: z
    .array(
      z.object({
        type: z.enum(['service', 'product', 'portfolio']),
        name: z.string(),
        description: z.string(),
        category: z.string().optional(),
        price: z.string().optional(),
      })
    )
    .optional(),
  gallery_headline: z.string(),
  shared_folder_link: z.string(),
  folder_organization_notes: z.string().optional(),
  contact_phone: z.string(),
  contact_email: z.string(),
  contact_address: z.string(),
  contact_form_recipient: z.string(),
});

export type Section3Data = z.infer<typeof baseSection3Schema>;

interface Section3Props {
  initialData?: Partial<Section3Data>;
  onNext: (data: Section3Data) => void;
  onBack?: () => void;
  onSave: (data: Partial<Section3Data>) => void;
  mainGoal?: string; // From Section 1
}


export default function Section3Content({
  initialData,
  onNext,
  onBack: _onBack,
  onSave,
  mainGoal,
}: Section3Props) {
  const [activeTab, setActiveTab] = useState('homepage');

  // Determine offerings configuration based on main_goal
  const offeringsConfig = {
    label: 'Services & Products',
    showTypeDropdown: true,
    defaultType: undefined as 'service' | 'product' | undefined,
    hideSection: false,
  };

  if (mainGoal === 'sell_products') {
    offeringsConfig.label = 'Products';
    offeringsConfig.showTypeDropdown = false;
    offeringsConfig.defaultType = 'product';
  } else if (mainGoal === 'call' || mainGoal === 'contact_form' || mainGoal === 'information') {
    offeringsConfig.label = 'Services';
    offeringsConfig.showTypeDropdown = false;
    offeringsConfig.defaultType = 'service';
  } else if (mainGoal === 'portfolio') {
    offeringsConfig.hideSection = false; // Keep visible but make it clear it's optional
    offeringsConfig.label = 'Services & Products (Optional)';
  }

  // Dynamic tabs based on offerings config
  const tabs = [
    { id: 'homepage', label: 'Homepage' },
    { id: 'about', label: 'About Us' },
    { id: 'offerings', label: offeringsConfig.label },
    { id: 'gallery', label: 'Gallery' },
    { id: 'files', label: 'Files & Assets' },
    { id: 'contact', label: 'Contact' },
  ];

  // Dynamic schema based on mainGoal
  const section3Schema = useMemo(() => {
    const requireOfferings = mainGoal && mainGoal !== 'portfolio';

    return z.object({
      // Homepage
      homepage_headline: z.string().trim().min(5, 'Headline must be at least 5 characters'),
      homepage_intro: z.string().trim().min(20, 'Introduction must be at least 20 characters'),

      // About
      about_headline: z.string().trim().min(5, 'Headline must be at least 5 characters'),
      about_description: z.string().trim().min(50, 'Description must be at least 50 characters'),

      // Offerings - Dynamic based on main_goal
      offerings_headline: requireOfferings
        ? z.string().trim().min(5, 'Headline must be at least 5 characters')
        : z.string().trim().optional(),
      offerings_list: requireOfferings
        ? z
            .array(
              z.object({
                type: z.enum(['service', 'product', 'portfolio'], {
                  required_error: 'Please select type',
                }),
                name: z.string().trim().min(2, 'Name required'),
                description: z.string().trim().min(10, 'Description must be at least 10 characters'),
                category: z.string().trim().optional(),
                price: z.string().trim().optional(),
              })
            )
            .min(1, 'Please add at least one item')
            .superRefine((items, ctx) => {
              items.forEach((item, index) => {
                // Price required ONLY for products
                if (item.type === 'product' && !item.price?.trim()) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Price is required for products',
                    path: [index, 'price'],
                  });
                }
              });
            })
        : z
            .array(
              z.object({
                type: z.enum(['service', 'product', 'portfolio'], {
                  required_error: 'Please select type',
                }),
                name: z.string().trim().min(2, 'Name required'),
                description: z.string().trim().min(10, 'Description must be at least 10 characters'),
                category: z.string().trim().optional(),
                price: z.string().trim().optional(),
              })
            )
            .optional()
            .superRefine((items, ctx) => {
              if (!items) return;
              items.forEach((item, index) => {
                // Price required ONLY for products
                if (item.type === 'product' && !item.price?.trim()) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Price is required for products',
                    path: [index, 'price'],
                  });
                }
              });
            }),

      // Gallery
      gallery_headline: z.string().trim().min(5, 'Headline must be at least 5 characters'),

      // Files & Assets
      shared_folder_link: z
        .string()
        .trim()
        .url('Please provide a valid URL')
        .refine(
          (url) => {
            const validDomains = [
              'drive.google.com',
              'docs.google.com',
              'dropbox.com',
              'www.dropbox.com',
              'wetransfer.com',
              'we.tl',
              'onedrive.live.com',
              '1drv.ms',
            ];
            try {
              const hostname = new URL(url).hostname.toLowerCase();
              return validDomains.some(domain => hostname.includes(domain));
            } catch {
              return false;
            }
          },
          {
            message: 'Please provide a valid link from Google Drive, Dropbox, WeTransfer, or OneDrive',
          }
        ),
      folder_organization_notes: z.string().trim().optional(),

      // Contact
      contact_phone: z.string().trim().min(10, 'Valid phone number required'),
      contact_email: z.string().trim().email('Valid email required'),
      contact_address: z.string().trim().min(10, 'Complete address required'),
      contact_form_recipient: z.string().trim().email('Valid email required'),
    });
  }, [mainGoal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<Section3Data>({
    resolver: zodResolver(section3Schema),
    defaultValues: initialData || {
      homepage_headline: '',
      homepage_intro: '',
      about_headline: '',
      about_description: '',
      offerings_headline: '',
      offerings_list: [],
      gallery_headline: '',
      shared_folder_link: '',
      folder_organization_notes: '',
      contact_phone: '',
      contact_email: '',
      contact_address: '',
      contact_form_recipient: '',
    },
  });

  const offeringsList = watch('offerings_list');

  // Re-validate when mainGoal changes
  useEffect(() => {
    trigger();
  }, [mainGoal, trigger]);

  const handleFormSubmit = async (data: Section3Data) => {
    onNext(data);
  };

  const handleAutoSave = async () => {
    const data = watch();
    onSave(data);
  };

  return (
    <form id="section-3-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-6 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-copper-500 text-copper-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-cream-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Homepage Tab */}
        {activeTab === 'homepage' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="homepage_headline">
                Main Headline <span className="text-destructive">*</span>
              </Label>
              <Input
                id="homepage_headline"
                {...register('homepage_headline')}
                placeholder="Welcome to Our Business"
                className="mt-1.5"
                onBlur={handleAutoSave}
              />
              {errors.homepage_headline && (
                <p className="text-destructive text-sm mt-1">
                  {errors.homepage_headline.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="homepage_intro">
                Introductory Paragraph <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="homepage_intro"
                {...register('homepage_intro')}
                placeholder="Briefly describe what you do and what makes you unique..."
                className="mt-1.5"
                rows={4}
                onBlur={handleAutoSave}
              />
              {errors.homepage_intro && (
                <p className="text-destructive text-sm mt-1">
                  {errors.homepage_intro.message}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="about_headline">
                Page Headline <span className="text-destructive">*</span>
              </Label>
              <Input
                id="about_headline"
                {...register('about_headline')}
                placeholder="About Our Company"
                className="mt-1.5"
                onBlur={handleAutoSave}
              />
              {errors.about_headline && (
                <p className="text-destructive text-sm mt-1">
                  {errors.about_headline.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="about_description">
                Company History/Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="about_description"
                {...register('about_description')}
                placeholder="Tell your company's story..."
                className="mt-1.5"
                rows={6}
                onBlur={handleAutoSave}
              />
              {errors.about_description && (
                <p className="text-destructive text-sm mt-1">
                  {errors.about_description.message}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Services & Products Tab */}
        {activeTab === 'offerings' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="offerings_headline">
                Page Headline{' '}
                {mainGoal && mainGoal !== 'portfolio' ? (
                  <span className="text-destructive">*</span>
                ) : (
                  '(Optional)'
                )}
              </Label>
              <Input
                id="offerings_headline"
                {...register('offerings_headline')}
                placeholder="Our Services & Products"
                className="mt-1.5"
                onBlur={handleAutoSave}
              />
              {errors.offerings_headline && (
                <p className="text-destructive text-sm mt-1">
                  {errors.offerings_headline.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-3 block">
                {offeringsConfig.label} List{' '}
                {mainGoal && mainGoal !== 'portfolio' ? (
                  <span className="text-destructive">*</span>
                ) : (
                  <span className="text-muted-foreground">(Optional)</span>
                )}
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                {mainGoal === 'sell_products'
                  ? 'Add your products with pricing. You can also add services or portfolio items if needed.'
                  : mainGoal === 'call' || mainGoal === 'contact_form' || mainGoal === 'information'
                  ? 'Add your services (pricing optional). You can also add products or portfolio items if needed.'
                  : mainGoal === 'portfolio'
                  ? 'Add your portfolio/work samples, products, or services. All optional - add only what you need.'
                  : 'Add your services, products, or portfolio items as needed.'}
              </p>
              <RepeaterField
                name="offerings_list"
                fields={[
                  {
                    name: 'type',
                    type: 'select' as const,
                    label: 'Type',
                    options: [
                      { label: 'Service', value: 'service' },
                      { label: 'Product', value: 'product' },
                      { label: 'Portfolio/Work', value: 'portfolio' },
                    ],
                    required: true,
                  },
                  {
                    name: 'name',
                    type: 'text',
                    label: 'Name/Title',
                    placeholder: 'Service name / Product name / Project title',
                    required: true,
                  },
                  {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description',
                    placeholder: 'Describe this item...',
                    required: true,
                  },
                  {
                    name: 'category',
                    type: 'text',
                    label: 'Category (Optional)',
                    placeholder: 'E.g., Branding, Fashion, Photography',
                    required: false,
                  },
                  {
                    name: 'price',
                    type: 'text',
                    label: 'Price',
                    placeholder: '$99 / GHS 500 / Contact for quote',
                    required: false,
                    showIf: (item) => item.type !== 'portfolio',
                  },
                ]}
                addButtonText={
                  mainGoal === 'sell_products'
                    ? 'Add Another Product'
                    : mainGoal === 'call' || mainGoal === 'contact_form' || mainGoal === 'information'
                    ? 'Add Another Service'
                    : mainGoal === 'portfolio'
                    ? 'Add Another Portfolio Item'
                    : 'Add Another Item'
                }
                max={15}
                value={offeringsList || []}
                onChange={(value) => {
                  setValue('offerings_list', value as any);
                  handleAutoSave();
                }}
              />
              {errors.offerings_list && (
                <p className="text-destructive text-sm mt-2">
                  {errors.offerings_list.message}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="gallery_headline">
                Page Headline <span className="text-destructive">*</span>
              </Label>
              <Input
                id="gallery_headline"
                {...register('gallery_headline')}
                placeholder="Our Work"
                className="mt-1.5"
                onBlur={handleAutoSave}
              />
              {errors.gallery_headline && (
                <p className="text-destructive text-sm mt-1">
                  {errors.gallery_headline.message}
                </p>
              )}
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> Upload your gallery images in the <strong>Files & Assets</strong> tab.
                Create a "gallery" subfolder in your shared folder with all portfolio/work images.
              </p>
            </div>
          </motion.div>
        )}

        {/* Files & Assets Tab (NEW) */}
        {activeTab === 'files' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <FolderGuide />

            <div>
              <Label htmlFor="shared_folder_link">
                Shared Folder Link <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Paste the shareable link to your folder containing all images (logo, banner, team photos, service images, gallery)
              </p>
              <Input
                id="shared_folder_link"
                {...register('shared_folder_link')}
                placeholder="https://drive.google.com/drive/folders/..."
                className="mt-1.5"
                onBlur={handleAutoSave}
              />
              {errors.shared_folder_link && (
                <p className="text-destructive text-sm mt-1">
                  {errors.shared_folder_link.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="folder_organization_notes">
                Additional Notes (Optional)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Any special instructions about your files or folder organization
              </p>
              <Textarea
                id="folder_organization_notes"
                {...register('folder_organization_notes')}
                placeholder="E.g., 'The logo with transparent background is in the logo-variations folder'"
                className="mt-1.5"
                rows={3}
                onBlur={handleAutoSave}
              />
            </div>
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact_phone">
                  Business Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  {...register('contact_phone')}
                  placeholder="+233 XX XXX XXXX"
                  className="mt-1.5"
                  onBlur={handleAutoSave}
                />
                {errors.contact_phone && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.contact_phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="contact_email">
                  Business Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  {...register('contact_email')}
                  placeholder="info@business.com"
                  className="mt-1.5"
                  onBlur={handleAutoSave}
                />
                {errors.contact_email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.contact_email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="contact_address">
                Physical Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="contact_address"
                {...register('contact_address')}
                placeholder="123 Main Street, City, Country"
                className="mt-1.5"
                rows={3}
                onBlur={handleAutoSave}
              />
              {errors.contact_address && (
                <p className="text-destructive text-sm mt-1">
                  {errors.contact_address.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contact_form_recipient">
                Contact Form Recipient Email <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Where should contact form submissions be sent?
              </p>
              <Input
                id="contact_form_recipient"
                type="email"
                {...register('contact_form_recipient')}
                placeholder="contact@business.com"
                className="mt-1.5"
                onBlur={handleAutoSave}
              />
              {errors.contact_form_recipient && (
                <p className="text-destructive text-sm mt-1">
                  {errors.contact_form_recipient.message}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </form>
  );
}
