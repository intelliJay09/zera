'use client';

/**
 * Section 4: Final Confirmation
 * Summary and sign-off before submission
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Edit2, ExternalLink, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Section1Data } from './Section1BrandIdentity';
import type { Section2Data } from './Section2Domain';
import type { Section3Data } from './Section3Content';

// Validation schema
const section4Schema = z.object({
  content_signoff: z.boolean().refine((val) => val === true, {
    message: 'You must confirm the accuracy of your content',
  }),
});

export type Section4Data = z.infer<typeof section4Schema>;

interface Section4Props {
  section1Data: Section1Data;
  section2Data: Section2Data;
  section3Data: Section3Data;
  onSubmit: (data: Section4Data) => void;
  onBack?: () => void;
  onEdit: (section: number) => void;
}

export default function Section4Confirmation({
  section1Data,
  section2Data,
  section3Data,
  onSubmit,
  onBack: _onBack,
  onEdit,
}: Section4Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Section4Data>({
    resolver: zodResolver(section4Schema),
    defaultValues: {
      content_signoff: false,
    },
  });

  const handleFormSubmit = async (data: Section4Data) => {
    onSubmit(data);
  };

  return (
    <form id="section-4-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Introduction */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Review Your Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Please review all the information you've provided below. You can go
              back to edit any section before final submission.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Brand Identity Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Brand Identity</h3>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onEdit(1)}
            className="w-fit"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-muted-foreground">Business Name:</span>
            <p className="text-foreground">{section1Data.business_name}</p>
          </div>

          {section1Data.business_tagline && (
            <div>
              <span className="font-semibold text-muted-foreground">Tagline:</span>
              <p className="text-foreground">{section1Data.business_tagline}</p>
            </div>
          )}

          {section1Data.social_links && section1Data.social_links.length > 0 && (
            <div>
              <span className="font-semibold text-muted-foreground">Social Media:</span>
              <ul className="mt-1 space-y-1">
                {section1Data.social_links.map((link, idx) => (
                  <li key={idx} className="text-foreground">
                    {link.platform}: {link.url}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <span className="font-semibold text-muted-foreground">Brand Style:</span>
            <p className="text-foreground">{section1Data.brand_style}</p>
          </div>

          <div>
            <span className="font-semibold text-muted-foreground">Main Goal:</span>
            <p className="text-foreground capitalize">{section1Data.main_goal.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Section 2: Domain Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Domain Names</h3>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onEdit(2)}
            className="w-fit"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold text-muted-foreground">Preferred:</span>
            <p className="text-foreground">{section2Data.desired_domain}.com</p>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground">Alternative 1:</span>
            <p className="text-foreground">{section2Data.alt_domain_1}.com</p>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground">Alternative 2:</span>
            <p className="text-foreground">{section2Data.alt_domain_2}.com</p>
          </div>
        </div>
      </div>

      {/* Section 3: Content Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Website Content</h3>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onEdit(3)}
            className="w-fit"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Homepage</h4>
            <p className="text-muted-foreground">
              {section3Data.homepage_headline}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">About</h4>
            <p className="text-muted-foreground">
              {section3Data.about_headline}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Offerings</h4>
            <p className="text-muted-foreground">
              {section3Data.offerings_list?.length || 0} item(s) listed
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Gallery</h4>
            <p className="text-muted-foreground">
              {section3Data.gallery_headline}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Files & Assets</h4>
            {section3Data.shared_folder_link ? (
              <a
                href={section3Data.shared_folder_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <FolderOpen className="h-4 w-4" />
                <span className="text-sm">View Shared Folder</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <p className="text-muted-foreground text-sm">No folder link provided</p>
            )}
            {section3Data.folder_organization_notes && (
              <p className="text-muted-foreground text-xs mt-2 italic">
                Note: {section3Data.folder_organization_notes}
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Contact</h4>
            <p className="text-muted-foreground">
              {section3Data.contact_phone} • {section3Data.contact_email}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sign-off */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="content_signoff"
            {...register('content_signoff')}
            className="mt-1 h-5 w-5 text-primary focus:ring-primary border-input rounded"
          />
          <div className="flex-1">
            <label htmlFor="content_signoff" className="text-sm font-semibold text-foreground">
              I confirm that all the information provided above is accurate and complete
            </label>
            <p className="text-xs text-muted-foreground mt-1">
              By checking this box, you confirm that you have reviewed all sections and
              that the information is ready for us to begin building your website.
            </p>
          </div>
        </div>
        {errors.content_signoff && (
          <p className="text-destructive text-sm mt-2 ml-8">
            {errors.content_signoff.message}
          </p>
        )}
      </div>
    </form>
  );
}
