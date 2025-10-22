'use client';

/**
 * Section 2: Domain Name
 * Collects desired domain names with TLD selection
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

// Popular TLDs
const tldOptions = [
  { label: '.com', value: '.com' },
  { label: '.net', value: '.net' },
  { label: '.org', value: '.org' },
  { label: '.co', value: '.co' },
  { label: '.io', value: '.io' },
  { label: '.africa', value: '.africa' },
  { label: '.gh', value: '.gh' },
  { label: '.ng', value: '.ng' },
];

// Validation schema - store complete domain with TLD
const section2Schema = z.object({
  desired_domain: z
    .string()
    .trim()
    .min(5, 'Complete domain must be at least 5 characters (e.g., "site.com")')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[a-z.]+$/,
      'Please enter a valid domain with extension'
    ),
  alt_domain_1: z
    .string()
    .trim()
    .min(5, 'Complete domain must be at least 5 characters')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[a-z.]+$/,
      'Please enter a valid domain with extension'
    ),
  alt_domain_2: z
    .string()
    .trim()
    .min(5, 'Complete domain must be at least 5 characters')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[a-z.]+$/,
      'Please enter a valid domain with extension'
    ),
});

export type Section2Data = z.infer<typeof section2Schema>;

interface Section2Props {
  initialData?: Partial<Section2Data>;
  onNext: (data: Section2Data) => void;
  onBack?: () => void;
  onSave: (data: Partial<Section2Data>) => void;
}

export default function Section2Domain({
  initialData,
  onNext,
  onBack: _onBack,
  onSave,
}: Section2Props) {
  // Extract domain name and TLD from initial data
  const extractDomain = (fullDomain: string) => {
    if (!fullDomain) return { name: '', tld: '.com' };
    const lastDot = fullDomain.lastIndexOf('.');
    if (lastDot === -1) return { name: fullDomain, tld: '.com' };
    const name = fullDomain.substring(0, lastDot);
    const tld = fullDomain.substring(lastDot);
    return { name, tld };
  };

  const [domainName1, setDomainName1] = useState(extractDomain(initialData?.desired_domain || '').name);
  const [tld1, setTld1] = useState(extractDomain(initialData?.desired_domain || '').tld);

  const [domainName2, setDomainName2] = useState(extractDomain(initialData?.alt_domain_1 || '').name);
  const [tld2, setTld2] = useState(extractDomain(initialData?.alt_domain_1 || '').tld);

  const [domainName3, setDomainName3] = useState(extractDomain(initialData?.alt_domain_2 || '').name);
  const [tld3, setTld3] = useState(extractDomain(initialData?.alt_domain_2 || '').tld);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<Section2Data>({
    resolver: zodResolver(section2Schema),
    defaultValues: initialData || {
      desired_domain: '',
      alt_domain_1: '',
      alt_domain_2: '',
    },
  });

  // Update hidden fields when domain name or TLD changes
  const updateDomain1 = (name: string, tld: string) => {
    setDomainName1(name);
    setTld1(tld);
    setValue('desired_domain', name && tld ? `${name}${tld}` : '');
    handleAutoSave();
  };

  const updateDomain2 = (name: string, tld: string) => {
    setDomainName2(name);
    setTld2(tld);
    setValue('alt_domain_1', name && tld ? `${name}${tld}` : '');
    handleAutoSave();
  };

  const updateDomain3 = (name: string, tld: string) => {
    setDomainName3(name);
    setTld3(tld);
    setValue('alt_domain_2', name && tld ? `${name}${tld}` : '');
    handleAutoSave();
  };

  const handleFormSubmit = async (data: Section2Data) => {
    onNext(data);
  };

  const handleAutoSave = async () => {
    const data = watch();
    onSave(data);
  };

  return (
    <form id="section-2-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Info Box */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-foreground mb-1">
            Domain Name Recommendations
          </p>
          <ul className="text-muted-foreground space-y-1">
            <li>• Keep it short and memorable</li>
            <li>• Avoid numbers and hyphens if possible</li>
            <li>• Make it relevant to your business</li>
            <li>• Provide alternatives in case your first choice is taken</li>
          </ul>
        </div>
      </div>

      {/* Desired Domain */}
      <div>
        <Label htmlFor="desired_domain_name">
          Desired Domain Name <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Enter your preferred domain name and choose an extension
        </p>
        <div className="flex items-center gap-2">
          <Input
            id="desired_domain_name"
            value={domainName1}
            onChange={(e) => updateDomain1(e.target.value, tld1)}
            placeholder="mycompany"
            className="flex-1"
            onBlur={handleAutoSave}
          />
          <select
            value={tld1}
            onChange={(e) => updateDomain1(domainName1, e.target.value)}
            className="px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-[120px]"
            onBlur={handleAutoSave}
          >
            {tldOptions.map((tld) => (
              <option key={tld.value} value={tld.value}>
                {tld.label}
              </option>
            ))}
          </select>
        </div>
        {/* Hidden field for validation */}
        <input type="hidden" {...register('desired_domain')} />
        {errors.desired_domain && (
          <p className="text-destructive text-sm mt-1">
            {errors.desired_domain.message}
          </p>
        )}
      </div>

      {/* Alternative Domain 1 */}
      <div>
        <Label htmlFor="alt_domain_1_name">
          Alternative Domain #1 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Second choice if your desired domain is unavailable
        </p>
        <div className="flex items-center gap-2">
          <Input
            id="alt_domain_1_name"
            value={domainName2}
            onChange={(e) => updateDomain2(e.target.value, tld2)}
            placeholder="mycompanyonline"
            className="flex-1"
            onBlur={handleAutoSave}
          />
          <select
            value={tld2}
            onChange={(e) => updateDomain2(domainName2, e.target.value)}
            className="px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-[120px]"
            onBlur={handleAutoSave}
          >
            {tldOptions.map((tld) => (
              <option key={tld.value} value={tld.value}>
                {tld.label}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" {...register('alt_domain_1')} />
        {errors.alt_domain_1 && (
          <p className="text-destructive text-sm mt-1">
            {errors.alt_domain_1.message}
          </p>
        )}
      </div>

      {/* Alternative Domain 2 */}
      <div>
        <Label htmlFor="alt_domain_2_name">
          Alternative Domain #2 <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Third choice as a backup option
        </p>
        <div className="flex items-center gap-2">
          <Input
            id="alt_domain_2_name"
            value={domainName3}
            onChange={(e) => updateDomain3(e.target.value, tld3)}
            placeholder="mycompanybusiness"
            className="flex-1"
            onBlur={handleAutoSave}
          />
          <select
            value={tld3}
            onChange={(e) => updateDomain3(domainName3, e.target.value)}
            className="px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring min-w-[120px]"
            onBlur={handleAutoSave}
          >
            {tldOptions.map((tld) => (
              <option key={tld.value} value={tld.value}>
                {tld.label}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" {...register('alt_domain_2')} />
        {errors.alt_domain_2 && (
          <p className="text-destructive text-sm mt-1">
            {errors.alt_domain_2.message}
          </p>
        )}
      </div>
    </form>
  );
}
